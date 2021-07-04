import { shallowMount } from '@vue/test-utils';
import Cart from './Cart.vue';

import { initLocalVue } from '@/tests/helpers';
const { localVue, Vuex } = initLocalVue();

let cart;
let $store;
let cartTotalMock;

let fakeCartItems;
let fakeTotal;

beforeEach(() => {
    fakeCartItems = [
        { productid: 'product1', variantid: 'variant1' },
        { productid: 'product1', variantid: 'variant2' },
        { productid: 'product1', variantid: 'variant3' }
    ];
    fakeTotal = 100;

    cartTotalMock = jest.fn();

    cart = {
        namespaced: true,
        state: {
            cartItems: fakeCartItems
        },
        getters: {
            cartTotal: () => cartTotalMock
        }
    };

    $store = new Vuex.Store({
        modules: {
            cart
        }
    });

    cartTotalMock.mockReturnValue(fakeTotal);
});

describe('Cart component', () => {
    it('should render correctly with right id', () => {
        const wrapper = shallowMount(Cart, { localVue, mocks: { $store } });

        expect(wrapper.is(Cart)).toBe(true);
        expect(wrapper.attributes().id).toBe('acquire-checkout-cart');
    });

    it('should render a cart title with right text', () => {
        const wrapper = shallowMount(Cart, { localVue, mocks: { $store } });
        const cartTitle = wrapper.find('#cart-title');

        expect(cartTitle.exists()).toBe(true);
        expect(cartTitle.text()).toBe('Welcome back Sarah !');
    });

    it('should render a cart greeting message with right text', () => {
        const wrapper = shallowMount(Cart, { localVue, mocks: { $store } });
        const cartGreeting = wrapper.find('#cart-greeting');

        expect(cartGreeting.exists()).toBe(true);
        expect(cartGreeting.text()).toBe('Nice to see you again !');
    });

    it('should render an enabled pay button with an icon and the right text', () => {
        const wrapper = shallowMount(Cart, { localVue, mocks: { $store } });
        const button = wrapper.find('v-btn-stub');
        const icon = button.find('v-icon-stub');

        expect(button.exists()).toBe(true);
        expect(icon.exists()).toBe(true);
        expect(button.text()).toContain(`Pay $ ${wrapper.vm.cartTotal}`);
        expect(button.props().disabled).toBe(false);
    });

    it('should render a CartItem component for each item in cart', () => {
        const wrapper = shallowMount(Cart, { localVue, mocks: { $store } });
        const cartItems = wrapper.findAll('CartItem-stub');

        expect(cartItems.length).toBe(wrapper.vm.cartItems.length);
    });

    it('should render the footer component', () => {
        const wrapper = shallowMount(Cart, { localVue, mocks: { $store } });
        const footer = wrapper.find('footer-stub');

        expect(footer.exists()).toBe(true);
    });
});
