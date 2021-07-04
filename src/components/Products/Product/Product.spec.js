/*
    Those tests are pretty simple because there is currently no
    error handling in the code.
*/

import { shallowMount } from '@vue/test-utils';
import Product from './Product.vue';

import { initLocalVue } from '@/tests/helpers';
const { localVue, Vuex } = initLocalVue();

let props;
let cart;
let products;
let getAllProductVariantsMock;
let $store;

let fakeProduct;
let fakeVariants;

beforeEach(() => {
    fakeProduct = {
        id: 'productid',
        defaultVariantId: 'variant2',
        name: 'productname',
        image: 'productimage',
        description: 'productdescription'
    };

    fakeVariants = [
        {
            id: 'variant1',
            price: 100,
            attributes: [
                { name: 'Attribute1', value: 'A' },
                { name: 'Attribute2', value: '1' }
            ]
        },
        {
            id: 'variant2',
            price: 10,
            attributes: [
                { name: 'Attribute1', value: 'B' },
                { name: 'Attribute2', value: '1' }
            ]
        },
        {
            id: 'variant3',
            price: 50,
            attributes: [
                { name: 'Attribute1', value: 'A' },
                { name: 'Attribute2', value: '2' }
            ]
        }
    ];

    props = {
        product: fakeProduct
    };

    getAllProductVariantsMock = jest.fn();

    cart = {
        namespaced: true,
        mutations: {
            MODIFY_CART: jest.fn().mockReturnValue()
        }
    };

    products = {
        namespaced: true,
        getters: {
            getAllProductVariants: () => getAllProductVariantsMock
        }
    };

    $store = new Vuex.Store({
        modules: {
            products,
            cart
        }
    });

    getAllProductVariantsMock.mockReturnValue(fakeVariants);
});

describe('Product component', () => {
    it('should render correctly with right class', () => {
        const wrapper = shallowMount(Product, { localVue, propsData: props, mocks: { $store } });

        expect(wrapper.is(Product)).toBe(true);
        expect(wrapper.classes()).toContain('acquire-checkout-product');
    });

    it('should set form properties with values from default variant', () => {
        // Indirect test of internal method _setFormProperties and _setDefaultVariantValues
        const wrapper = shallowMount(Product, { localVue, propsData: props, mocks: { $store } });
        const expectedFormData = {
            Attribute1: 'B',
            Attribute2: '1'
        };

        expect(wrapper.vm.formData).toEqual(expectedFormData);
    });

    it('should render product image with right source', () => {
        const wrapper = shallowMount(Product, { localVue, propsData: props, mocks: { $store } });
        const productImg = wrapper.find('v-img-stub');

        expect(productImg.exists()).toBe(true);
        expect(productImg.props().src).toBe(wrapper.vm.product.image);
    });

    it('should render product name', () => {
        const wrapper = shallowMount(Product, { localVue, propsData: props, mocks: { $store } });
        const productName = wrapper.find('.product-name');

        expect(productName.exists()).toBe(true);
        expect(productName.text()).toBe(wrapper.vm.product.name);
    });

    it('should render selected variant price', () => {
        const wrapper = shallowMount(Product, { localVue, propsData: props, mocks: { $store } });
        const variantPrice = wrapper.find('.variant-price');

        expect(variantPrice.exists()).toBe(true);
        expect(variantPrice.text()).toBe(`$ ${wrapper.vm.selectedVariant.price}`);
    });

    it('should render product description', () => {
        const wrapper = shallowMount(Product, { localVue, propsData: props, mocks: { $store } });
        const productDescription = wrapper.find('.product-description');

        expect(productDescription.exists()).toBe(true);
        expect(productDescription.text()).toBe(wrapper.vm.product.description);
    });

    it('should render a radio group for each unique attribute', () => {
        const wrapper = shallowMount(Product, { localVue, propsData: props, mocks: { $store } });
        const radioGroups = wrapper.findAll('v-radio-group-stub');

        expect(radioGroups.length).toBe(wrapper.vm.attributes.length);
    });

    it('should render a radio option for each attribute unique value', () => {
        const wrapper = shallowMount(Product, { localVue, propsData: props, mocks: { $store } });
        const radioGroups = wrapper.findAll('v-radio-group-stub');

        [0, 1].forEach((attribute, idx) => {
            const radioOptions = radioGroups.at(0).findAll('v-radio-stub');

            expect(radioOptions.length).toBe(wrapper.vm.attributes[idx].values.length);
        });
    });

    it('should render an enabled button with right text', () => {
        const wrapper = shallowMount(Product, { localVue, propsData: props, mocks: { $store } });
        const button = wrapper.find('v-btn-stub');

        expect(button.exists()).toBe(true);
        expect(button.text()).toBe('Add to cart');
        expect(button.props().disabled).toBe(false);
    });

    describe('variants computed property', () => {
        it('should return variants associated with product from store', () => {
            const wrapper = shallowMount(Product, {
                localVue,
                propsData: props,
                mocks: { $store }
            });

            expect(getAllProductVariantsMock).toHaveBeenCalledTimes(1);
            expect(getAllProductVariantsMock).toHaveBeenCalledWith(wrapper.vm.product.id);
            expect(wrapper.vm.variants).toEqual(fakeVariants);
        });
    });

    describe('attributes computed property', () => {
        it('should return an array of unique attributes with their unique values', () => {
            const wrapper = shallowMount(Product, {
                localVue,
                propsData: props,
                mocks: { $store }
            });
            const expectedAttributes = [
                { name: 'Attribute1', values: ['A', 'B'] },
                { name: 'Attribute2', values: ['1', '2'] }
            ];

            expect(wrapper.vm.attributes).toEqual(expectedAttributes);
        });
    });

    describe('selectedVariant computed property', () => {
        it('should return the currently selected variant based on selected values', () => {
            const wrapper = shallowMount(Product, {
                localVue,
                propsData: props,
                mocks: { $store }
            });

            wrapper.setData({ formData: { Attribute1: 'A', Attribute2: '2' } });

            expect(wrapper.vm.selectedVariant).toEqual(wrapper.vm.variants[2]);
        });
    });

    describe('_mutationParams computed property', () => {
        it('should return an object containing the productid, variantid and price', () => {
            const wrapper = shallowMount(Product, {
                localVue,
                propsData: props,
                mocks: { $store }
            });

            const expectedMutationParams = {
                productid: 'productid',
                variantid: 'variant2',
                price: 10
            };

            expect(wrapper.vm._mutationParams).toEqual(expectedMutationParams);
        });
    });

    describe('addToCart method', () => {
        it('should execute store mutation with right param', () => {
            const wrapper = shallowMount(Product, {
                localVue,
                propsData: props,
                mocks: { $store }
            });

            wrapper.vm.addToCart();

            expect(cart.mutations.MODIFY_CART).toHaveBeenCalledTimes(1);
            expect(cart.mutations.MODIFY_CART).toHaveBeenLastCalledWith(
                expect.anything(),
                wrapper.vm._mutationParams
            );
        });
    });
});
