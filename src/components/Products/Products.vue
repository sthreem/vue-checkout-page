<template>
    <v-col id="acquire-checkout-products" cols="12" lg="8">
        <Product v-for="product in products" :key="product.id" :product="product" />
    </v-col>
</template>

<script>
import { mapState } from 'vuex';

import Product from '@/components/Products/Product/Product.vue';

// Wrapper component. Not much logic needed.
// Only job is to retrieve products from store and pass them to individual product components.
export default {
    name: 'Products',
    components: {
        Product
    },
    computed: {
        ...mapState('products', ['products'])
    }
};
</script>

<!-- Style -->
<style lang="scss">
#acquire-checkout-products {
}
</style>
