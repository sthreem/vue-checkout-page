import { shallowMount } from '@vue/test-utils';
import App from './App.vue';

import { initLocalVue } from '@/tests/helpers';
const { localVue, Vuex } = initLocalVue();

let products;
let $store;

beforeEach(() => {
    products = {
        namespaced: true,
        actions: {
            loadProducts: jest.fn()
        }
    };

    $store = new Vuex.Store({
        modules: {
            products
        }
    });

    products.actions.loadProducts.mockResolvedValue();
});

describe('App component', () => {
    it('should render properly', () => {
        const wrapper = shallowMount(App, { localVue, mocks: { $store } });
        expect(wrapper.exists()).toBe(true);
    });

    it('should load products in store', () => {
        shallowMount(App, { localVue, mocks: { $store } });

        expect(products.actions.loadProducts).toHaveBeenCalledTimes(1);
    });

    it('should render the Header component', () => {
        const wrapper = shallowMount(App, { localVue, mocks: { $store } });
        const header = wrapper.find('header-stub');

        expect(header.exists()).toBe(true);
    });

    it('should render the Products component', () => {
        const wrapper = shallowMount(App, { localVue, mocks: { $store } });
        const products = wrapper.find('products-stub');

        expect(products.exists()).toBe(true);
    });

    it('should render the Cart component', () => {
        const wrapper = shallowMount(App, { localVue, mocks: { $store } });
        const cart = wrapper.find('cart-stub');

        expect(cart.exists()).toBe(true);
    });
});
