<!-- TODO:
    - Implement error handling (Components and store), and tests
    - Define default values for dependant computed property, and tests
    - Implement design from Figma by Overwriting vuetify style and creating a global one
-->

<template>
    <v-app id="acquire-checkout-page">
        <Header />
        <v-main>
            <v-container>
                <v-row>
                    <Products />
                    <Cart />
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import { mapActions } from 'vuex';

import Header from '@/components/Header/Header.vue';
import Products from '@/components/Products/Products.vue';
import Cart from '@/components/Cart/Cart.vue';

export default {
    name: 'App',
    components: {
        Header,
        Products,
        Cart
    },
    async created() {
        // Usually this kind of operation would go in a route guard,
        // so the products are loaded in store before the route itself
        await this.loadProducts();
    },
    methods: {
        ...mapActions('products', ['loadProducts'])
    }
};
</script>

<style lang="scss">
#acquire-checkout-page {
    main {
        margin-top: -118px;
    }
}
</style>
