<!-- Html template -->
<template>
    <header id="acquire-checkout-header">
        <v-container>
            <span>
                <!-- TODO: Find a way to download the logo without background from Figma -->
                <v-img
                    src="@/assets/seller-logo.png"
                    max-height="33"
                    max-width="102"
                    id="seller-logo"
                ></v-img>
                <a :href="sellerUrl" target="_blank" id="seller-link">
                    Visit allbirds.com
                    <v-icon small>mdi-arrow-right</v-icon>
                </a>
            </span>
            <span>
                <h1 id="seller-bundle-name">{{ bundleName }}</h1>
                <h2 id="seller-bundle-description">{{ bundleDescription }}</h2>
            </span>
        </v-container>
    </header>
</template>

<!-- Javascript -->
<script>
// Exported constants for unit tests purposes
export const SELLER = {
    URL: 'https://www.allbirds.com/',
    BUNDLE_NAME: 'Jenny’s outfit',
    BUNDLE_DESCRIPTION:
        'Dress like your idole with this super bundle and be the star you always wanted to be !'
};

export default {
    name: 'Header',
    data() {
        return {
            // Usually this kind of info should be pulled from a separate seller state module in the store
            sellerUrl: SELLER.URL,
            bundleName: SELLER.BUNDLE_NAME,
            bundleDescription: SELLER.BUNDLE_DESCRIPTION
        };
    }
};
</script>

<style lang="scss">
#acquire-checkout-header {
    height: 440px;
    background: url('~@/assets/acquire-checkout-background.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
