import { createLocalVue } from '@vue/test-utils';
import clonedeep from 'lodash.clonedeep';
import Vuex from 'vuex';

import cartModule from './cart';

const localVue = createLocalVue();
let store;

localVue.use(Vuex);

beforeEach(() => {
    store = new Vuex.Store({ modules: { cart: clonedeep(cartModule) } });
});

describe('cart state module', () => {
    it('should have empty initial state with default values on initialization', () => {
        expect(store.state.cart).toEqual({
            cartItems: []
        });
    });

    describe('getCartTotal getter', () => {
        let items;

        beforeEach(() => {
            items = [
                {
                    productid: 'product1',
                    variantid: 'variant1',
                    quantity: 1,
                    price: 99
                },
                {
                    productid: 'product2',
                    variantid: 'variant2',
                    quantity: 1,
                    price: 99
                }
            ];
        });

        it('should return total price of products in cart', () => {
            items.forEach(item => store.commit('cart/ADD_ITEM_TO_CART', { item }));
            const expectedTotal =
                items[0].price * items[0].quantity + items[1].price * items[1].quantity;

            expect(store.getters['cart/getCartTotal']).toBe(expectedTotal);
        });

        it('should return 0 when cart is empty', () => {
            expect(store.getters['cart/getCartTotal']).toBe(0);
        });
    });

    describe('ADD_ITEM_TO_CART mutation', () => {
        let item;

        beforeEach(() => {
            item = {
                productid: 'product1',
                variantid: 'variant1',
                quantity: 1,
                price: 99
            };
        });

        it('should add new item to cart if does not exist already', () => {
            store.commit('cart/ADD_ITEM_TO_CART', { item });

            expect(store.state.cart.cartItems).toEqual([item]);
        });

        it('should increase quantity when item already in cart', () => {
            [0, 1].forEach(() => {
                store.commit('cart/ADD_ITEM_TO_CART', { item });
            });

            expect(store.state.cart.cartItems[0].quantity).toBe(2);
        });
    });

    describe('REMOVE_ITEM_FROM_CART mutation', () => {
        let item;

        beforeEach(() => {
            item = {
                productid: 'product1',
                variantid: 'variant1',
                quantity: 1,
                price: 99
            };
        });

        it('should remove item when its quantity is only one', () => {
            store.commit('cart/ADD_ITEM_TO_CART', { item });
            expect(store.state.cart.cartItems[0].quantity).toBe(1);

            store.commit('cart/REMOVE_ITEM_FROM_CART', {
                productid: item.productid,
                variantid: item.variantid
            });
            expect(store.state.cart.cartItems.length).toBe(0);
        });

        it('should decrease quantity when item quantity is more than one', () => {
            [0, 1].forEach(() => {
                store.commit('cart/ADD_ITEM_TO_CART', { item });
            });
            expect(store.state.cart.cartItems[0].quantity).toBe(2);

            store.commit('cart/REMOVE_ITEM_FROM_CART', {
                productid: item.productid,
                variantid: item.variantid
            });
            expect(store.state.cart.cartItems[0].quantity).toBe(1);
        });
    });
});
