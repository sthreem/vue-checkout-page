import Vue from 'vue';
import axios from 'axios';
import clonedeep from 'lodash.clonedeep';

export const PRODUCTS_ENDPOINT = 'https://api.npoint.io/ec39ab1aa4edf145235a';

const initialState = () => ({
    products: [],
    // Hash table with productid as key for easier manipulation of variants in components
    variants: {}
});

const state = initialState();

const getters = {
    getAllProductVariants: state => productid => state.variants[productid] || null,
    getSingleProductVariant: state => (productid, variantid) =>
        state.variants[productid]?.find(v => v.id === variantid) || null,
    isProductsLoaded: state => state.products?.length > 0
};

const actions = {
    async loadProducts({ commit, getters }) {
        if (!getters.isProductsLoaded) {
            // No error handling for simplicity's sake.
            const response = await axios.get(PRODUCTS_ENDPOINT);
            const { products } = response.data;

            commit('SET_PRODUCTS', { products });
        }
    }
};

const mutations = {
    SET_PRODUCTS(state, { products }) {
        products.forEach(product => {
            const productCopy = clonedeep(product);
            delete productCopy.variants;

            state.products.push(productCopy);
            Vue.set(state.variants, productCopy.id, [...product.variants]);
        });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
