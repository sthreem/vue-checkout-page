const initialState = () => ({
    /*
        {
            productid: 'id',
            variantid: 'id',
            price: 0,
            quantity: 0
        }
    */
    cartItems: []
});

const state = initialState();

const getters = {
    getCartTotal: state =>
        state.cartItems.reduce((acc, item) => item.price * item.quantity + acc, 0)
};

const actions = {};

const mutations = {
    ADD_ITEM_TO_CART(state, { item }) {
        const { productid, variantid } = item;
        // Get index of item and check if variant of this product already in cart
        const itemIndex = state.cartItems.findIndex(
            item => item.productid === productid && item.variantid === variantid
        );

        // If already in cart, increase quantity. Otherwise, add it.
        itemIndex >= 0 ? state.cartItems[itemIndex].quantity++ : state.cartItems.push(item);
    },

    REMOVE_ITEM_FROM_CART(state, { productid, variantid }) {
        // Get index of item already in cart.
        const itemIndex = state.cartItems.findIndex(
            item => item.productid === productid && item.variantid === variantid
        );

        // If more than one of this product variant in cart, decrease quantity.
        // Otherwise, remove it.
        state.cartItems[itemIndex].quantity > 1
            ? state.cartItems[itemIndex].quantity--
            : state.cartItems.splice(itemIndex, 1);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
