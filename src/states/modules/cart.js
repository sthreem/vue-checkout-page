const initialState = () => ({
    cartItems: []
});

const state = initialState();

const getters = {
    cartTotal: state =>
        state.cartItems.reduce((acc, item) => Number(item.price) * item.quantity + acc, 0)
};

const actions = {};

const mutations = {
    /*
        Since the logic is too simple and simillar for adding and removing an item in this
        test, those two mutations have been merged into one, with a param indicating if
        we are adding or removing items, and conditional application of the needed logic.
    */
    MODIFY_CART(state, { productid, variantid, price = 0, increase = true }) {
        // Get index of item and check if variant of this product already in cart
        const itemIndex = state.cartItems.findIndex(
            item => item.productid === productid && item.variantid === variantid
        );

        // When adding an item, if already in cart, increase quantity.
        // Otherwise, add it to cart.
        if (increase) {
            return itemIndex >= 0
                ? state.cartItems[itemIndex].quantity++
                : state.cartItems.push({ productid, variantid, price, quantity: 1 });
        }

        // When removing an item, if more than one of this product variant is in cart,
        // decrease quantity. Otherwise, remove it from cart.
        return state.cartItems[itemIndex].quantity > 1
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
