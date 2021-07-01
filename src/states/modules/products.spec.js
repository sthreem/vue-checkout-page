import { createLocalVue } from '@vue/test-utils';
import axios from 'axios';
import clonedeep from 'lodash.clonedeep';
import Vuex from 'vuex';

import productsModule, { PRODUCTS_ENDPOINT } from './products';

const localVue = createLocalVue();
let store;

localVue.use(Vuex);

beforeEach(() => {
    store = new Vuex.Store({ modules: { products: clonedeep(productsModule) } });
});

describe('products state module', () => {
    let products;
    let variants;

    beforeEach(() => {
        variants = [
            [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }],
            [{ id: '5' }, { id: '6' }, { id: '7' }, { id: '8' }]
        ];
        products = [
            { id: 'product1', variants: variants[0] },
            { id: 'product2', variants: variants[1] }
        ];
    });

    it('should have empty initial state with default values on initialization', () => {
        expect(store.state.products).toEqual({
            products: [],
            variants: {}
        });
    });

    describe('getAllProductVariants getter', () => {
        let productid;

        beforeEach(() => {
            productid = products[0].id;
        });

        it('should return variants for matching productid', () => {
            store.commit('products/SET_PRODUCTS', { products });

            expect(store.state.products.variants[productid]).toEqual(products[0].variants);
            expect(store.getters['products/getAllProductVariants'](productid)).toEqual(
                store.state.products.variants[productid]
            );
        });

        it('should return null if no variants with matching productid', () => {
            expect(store.state.products.variants[productid]).toBeUndefined();
            expect(store.getters['products/getAllProductVariants'](productid)).toEqual(null);
        });
    });

    describe('getSingleProductVariant getter', () => {
        let productid;
        let variantid;

        beforeEach(() => {
            productid = products[0].id;
            variantid = variants[0][0].id;
        });

        it('should return single variant for matching productid and variantid', () => {
            store.commit('products/SET_PRODUCTS', { products });

            expect(store.state.products.variants[productid][0]).toEqual(products[0].variants[0]);
            expect(store.getters['products/getSingleProductVariant'](productid, variantid)).toEqual(
                store.state.products.variants[productid][0]
            );
        });

        it('should return null if no single variant with matching productid and variantid', () => {
            expect(store.getters['products/getSingleProductVariant'](productid, variantid)).toEqual(
                null
            );
        });
    });

    describe('isProductsLoaded getter', () => {
        it('should return false if there are no products', () => {
            expect(store.getters['products/isProductsLoaded']).toEqual(false);
        });

        it('should return true if there is at least one product', () => {
            store.commit('products/SET_PRODUCTS', { products: [products[0]] });

            expect(store.getters['products/isProductsLoaded']).toEqual(true);
        });
    });

    describe('loadProducts action', () => {
        const response = {};

        beforeEach(() => {
            response.data = { products };
            axios.get.mockResolvedValue(response);
        });

        it('should not fetch products if already loaded', async () => {
            store.commit('products/SET_PRODUCTS', { products });

            await store.dispatch('products/loadProducts');

            expect(axios.get).not.toHaveBeenCalled();
        });

        it('should fetch products from correct endpoint', async () => {
            await store.dispatch('products/loadProducts');

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(PRODUCTS_ENDPOINT);
        });

        it('should commit fetched products', async () => {
            store.commit = jest.fn();
            await store.dispatch('products/loadProducts');

            expect(store.commit).toHaveBeenCalled();
            expect(store.commit).toHaveBeenCalledWith(
                'products/SET_PRODUCTS',
                {
                    products: products
                },
                undefined
            );
        });
    });

    describe('SET_PRODUCTS mutation', () => {
        it('should remove variants from products in state', () => {
            store.commit('products/SET_PRODUCTS', { products });

            expect(store.state.products.products[0].variants).toBeUndefined();
            expect(store.state.products.products[1].variants).toBeUndefined();
        });

        it('should set separately products and variants in state', () => {
            store.commit('products/SET_PRODUCTS', { products });

            const expectedProducts = [{ id: 'product1' }, { id: 'product2' }];
            const expectedVariants = {
                product1: variants[0],
                product2: variants[1]
            };

            expect(store.state.products.products).toEqual(expectedProducts);
            expect(store.state.products.variants).toEqual(expectedVariants);
        });
    });
});
