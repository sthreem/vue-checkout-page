import { shallowMount } from '@vue/test-utils';
import CartItem from './CartItem.vue';

import { initLocalVue } from '@/tests/helpers';
const { localVue, Vuex } = initLocalVue();

let cart;
let products;
let $store;
let getProductMock;
let getSingleProductVariantMock;
let props;

let fakeItem;
let fakeProduct;
let fakeVariant;

beforeEach(() => {
    fakeProduct = {
        id: 'productid',
        defaultVariantId: 'variant2',
        name: 'productname',
        image: 'productimage',
        description: 'productdescription'
    };

    fakeVariant = {
        id: 'variant1',
        price: 100,
        name: 'variantname',
        attributes: [
            { name: 'Attribute1', value: 'A' },
            { name: 'Attribute2', value: '1' }
        ]
    };

    getProductMock = jest.fn();
    getSingleProductVariantMock = jest.fn();

    cart = {
        namespaced: true,
        mutations: {
            MODIFY_CART: jest.fn().mockReturnValue()
        }
    };

    products = {
        namespaced: true,
        getters: {
            getProduct: () => getProductMock,
            getSingleProductVariant: () => getSingleProductVariantMock
        }
    };

    $store = new Vuex.Store({
        modules: {
            cart,
            products
        }
    });

    fakeItem = {
        productid: fakeProduct.id,
        variantid: fakeVariant.id,
        price: 10,
        quantity: 1
    };

    props = {
        item: fakeItem
    };

    getProductMock.mockReturnValue(fakeProduct);
    getSingleProductVariantMock.mockReturnValue(fakeVariant);
});

describe('CartItem component', () => {
    it('should render correctly with right id', () => {
        const wrapper = shallowMount(CartItem, { localVue, propsData: props, mocks: { $store } });

        expect(wrapper.is(CartItem)).toBe(true);
        expect(wrapper.classes()).toContain('acquire-checkout-cart-item');
    });

    it('should render product image with right source', () => {
        const wrapper = shallowMount(CartItem, { localVue, propsData: props, mocks: { $store } });
        const productImg = wrapper.find('v-img-stub');

        expect(productImg.exists()).toBe(true);
        expect(productImg.props().src).toBe(wrapper.vm.product.image);
    });

    it('should render product name', () => {
        const wrapper = shallowMount(CartItem, { localVue, propsData: props, mocks: { $store } });
        const productName = wrapper.find('.cart-product-name');

        expect(productName.exists()).toBe(true);
        expect(productName.text()).toBe(wrapper.vm.product.name);
    });

    it('should render variant name', () => {
        const wrapper = shallowMount(CartItem, { localVue, propsData: props, mocks: { $store } });
        const variantName = wrapper.find('.cart-variant-name');

        expect(variantName.exists()).toBe(true);
        expect(variantName.text()).toBe(wrapper.vm.variant.name);
    });

    it('should render variant price', () => {
        const wrapper = shallowMount(CartItem, { localVue, propsData: props, mocks: { $store } });
        const variantPrice = wrapper.find('.cart-variant-price');

        expect(variantPrice.exists()).toBe(true);
        expect(variantPrice.text()).toBe(`$ ${wrapper.vm.variant.price}`);
    });

    it('should render a decrease button, the current quantity and an increase button', () => {
        const wrapper = shallowMount(CartItem, { localVue, propsData: props, mocks: { $store } });
        const cartItemActions = wrapper.find('v-card-actions-stub');
        const decreaseButton = cartItemActions.find('.cart-decrease-product');
        const increaseButton = cartItemActions.find('.cart-increase-product');

        expect(cartItemActions.text()).toContain(wrapper.vm.item.quantity);
        expect(decreaseButton.exists()).toBe(true);
        expect(decreaseButton.props().disabled).toBe(false);
        expect(increaseButton.exists()).toBe(true);
        expect(increaseButton.props().disabled).toBe(false);
    });

    describe('product computed property', () => {
        it('should fetch product from store by id from props and return it', () => {
            const wrapper = shallowMount(CartItem, {
                localVue,
                propsData: props,
                mocks: { $store }
            });

            expect(getProductMock).toHaveBeenCalledTimes(1);
            expect(getProductMock).toHaveBeenCalledWith(props.item.productid);

            expect(wrapper.vm.product).toEqual(fakeProduct);
        });
    });

    describe('variant computed property', () => {
        it('should fetch variant from store by id and productid from props and return it', () => {
            const wrapper = shallowMount(CartItem, {
                localVue,
                propsData: props,
                mocks: { $store }
            });

            expect(getSingleProductVariantMock).toHaveBeenCalledTimes(1);
            expect(getSingleProductVariantMock).toHaveBeenCalledWith(
                props.item.productid,
                props.item.variantid
            );

            expect(wrapper.vm.variant).toEqual(fakeVariant);
        });
    });

    describe('_mutationParams computed property', () => {
        it('should return an object containing the productid, variantid and price', () => {
            const wrapper = shallowMount(CartItem, {
                localVue,
                propsData: props,
                mocks: { $store }
            });

            const expectedMutationParams = {
                productid: wrapper.vm.product.id,
                variantid: wrapper.vm.variant.id
            };

            expect(wrapper.vm._mutationParams).toEqual(expectedMutationParams);
        });
    });

    describe('addToCart method', () => {
        it('should execute store mutation with right param', () => {
            const wrapper = shallowMount(CartItem, {
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

    describe('removeFromCart method', () => {
        it('should execute store mutation with right param', () => {
            const wrapper = shallowMount(CartItem, {
                localVue,
                propsData: props,
                mocks: { $store }
            });

            wrapper.vm.removeFromCart();

            expect(cart.mutations.MODIFY_CART).toHaveBeenCalledTimes(1);
            expect(cart.mutations.MODIFY_CART).toHaveBeenLastCalledWith(expect.anything(), {
                ...wrapper.vm._mutationParams,
                increase: false
            });
        });
    });
});
