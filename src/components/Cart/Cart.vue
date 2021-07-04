<template>
    <v-col id="acquire-checkout-cart" cols="12" lg="4">
        <v-card>
            <v-container>
                <v-row>
                    <v-col>
                        <h1 id="cart-title">Welcome back Sarah !</h1>
                        <h2 id="cart-greeting">Nice to see you again !</h2>
                        <v-card-actions>
                            <v-btn
                                id="cart-pay-button"
                                block
                                color="primary"
                                large
                                :disabled="cartTotal === 0"
                            >
                                <v-icon small>mdi-lock</v-icon>
                                Pay $ {{ cartTotal }}
                            </v-btn>
                        </v-card-actions>
                        <h2 id="cart-description">Your cart</h2>
                        <CartItem
                            v-for="item in cartItems"
                            :key="`${item.productid}-${item.variantid}`"
                            :item="item"
                        />
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
        <Footer />
    </v-col>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import CartItem from '@/components/Cart/CartItem/CartItem.vue';
import Footer from '@/components/Footer/Footer.vue';

export default {
    name: 'Cart',
    components: {
        CartItem,
        Footer
    },
    computed: {
        ...mapState('cart', ['cartItems']),
        ...mapGetters('cart', ['cartTotal'])
    }
};
</script>

<!-- Style -->
<style lang="scss">
#acquire-checkout-cart {
    #cart-title {
        font-size: 18px;
        line-height: 24px;
        text-align: center;
    }

    #cart-greeting {
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
        text-align: center;
        margin-bottom: 20px;
    }

    #cart-pay-button {
        margin-bottom: 50px;
    }

    #cart-description {
        font-size: 18px;
        line-height: 24px;
    }
}
</style>
