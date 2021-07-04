<template>
    <v-card class="acquire-checkout-cart-item" flat>
        <v-container fluid>
            <v-row>
                <v-col cols="4">
                    <v-img :src="product.image" max-height="70" max-width="70"></v-img>
                </v-col>
                <v-col cols="8">
                    <p class="cart-product-name">{{ product.name }}</p>
                    <p class="cart-variant-name">{{ variant.name }}</p>
                    <p class="cart-variant-price">$ {{ variant.price }}</p>
                    <v-card-actions>
                        <v-btn
                            color="primary"
                            class="cart-decrease-product"
                            fab
                            x-small
                            @click="removeFromCart"
                        >
                            <v-icon small>mdi-minus</v-icon>
                        </v-btn>
                        {{ item.quantity }}
                        <v-btn
                            color="primary"
                            class="cart-increase-product"
                            fab
                            x-small
                            @click="addToCart"
                        >
                            <v-icon small>mdi-plus</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: 'CartItem',
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapGetters('products', ['getProduct', 'getSingleProductVariant']),
        product() {
            return this.getProduct(this.item.productid);
        },
        variant() {
            return this.getSingleProductVariant(this.item.productid, this.item.variantid);
        },
        _mutationParams() {
            return {
                productid: this.product.id,
                variantid: this.variant.id
            };
        }
    },
    methods: {
        ...mapMutations('cart', ['MODIFY_CART']),
        addToCart() {
            this.MODIFY_CART(this._mutationParams);
        },
        removeFromCart() {
            this.MODIFY_CART({ ...this._mutationParams, increase: false });
        }
    }
};
</script>

<!-- Style -->
<style lang="scss">
.acquire-checkout-cart-item {
}
</style>
