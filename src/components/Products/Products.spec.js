import { shallowMount } from '@vue/test-utils';

import Products from './Products.vue';

import { initLocalVue } from '@/tests/helpers';
const { localVue, Vuex } = initLocalVue();

let products;
let $store;

const fakeProducts = [{ id: 'product1' }, { id: 'product2' }];

beforeEach(() => {
    products = {
        namespaced: true,
        state: {
            products: fakeProducts
        }
    };

    $store = new Vuex.Store({
        modules: {
            products
        }
    });
});

describe('Products component', () => {
    it('should render correctly with right id', () => {
        const wrapper = shallowMount(Products, { localVue, mocks: { $store } });

        expect(wrapper.is(Products)).toBe(true);
        expect(wrapper.attributes().id).toBe('acquire-checkout-products');
    });

    it('should render a Product component with right props for every product in store', () => {
        const wrapper = shallowMount(Products, { localVue, mocks: { $store } });
        const productComponents = wrapper.findAll('product-stub');

        expect(productComponents.length).toBe(products.state.products.length);
        expect(productComponents.at(0).props().product).toEqual(products.state.products[0]);
        expect(productComponents.at(1).props().product).toEqual(products.state.products[1]);
    });
});
