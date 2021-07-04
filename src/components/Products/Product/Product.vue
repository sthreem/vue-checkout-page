<template>
    <v-card class="acquire-checkout-product">
        <v-container fluid>
            <v-row>
                <v-col cols="4">
                    <v-img
                        :src="product.image"
                        max-height="320"
                        max-width="300"
                        class="product-image"
                    ></v-img>
                </v-col>
                <v-col cols="8">
                    <span>
                        <h1 class="product-name">{{ product.name }}</h1>
                        <h2 class="variant-price">$ {{ selectedVariant.price }}</h2>
                    </span>
                    <p class="product-description">{{ product.description }}</p>
                    <v-radio-group
                        v-for="(attribute, idx) in attributes"
                        :key="`${attribute.name}-${idx}`"
                        v-model="formData[attribute.name]"
                        row
                    >
                        <v-radio
                            v-for="(value, idx) in attribute.values"
                            :key="`${value}-${idx}`"
                            :label="value"
                            :value="value"
                        ></v-radio>
                    </v-radio-group>
                    <v-card-actions>
                        <v-btn color="primary" @click="addToCart">Add to cart</v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: 'Product',
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            formData: {}
        };
    },
    created() {
        // We need to set form properties based on the existing attributes of the variant
        this._setFormProperties();
        // Next, we need to set the values in the form based on the ones from the default variant
        this._setDefaultVariantValues();
    },
    computed: {
        ...mapGetters('products', ['getAllProductVariants']),
        variants() {
            return this.getAllProductVariants(this.product.id);
        },
        attributes() {
            // Assuming that we don't know variant's attributes names and values in advance
            const _attributes = [];

            this.variants.forEach(va => {
                // TODO: Check if we can avoid loop in loop
                va.attributes.forEach(att => {
                    // Has the variant's attribute name already been identified?
                    const attIdx = _attributes.findIndex(a => a.name === att.name);

                    // If not, add it to the array
                    if (attIdx < 0) {
                        return _attributes.push({
                            name: att.name,
                            values: [att.value]
                        });
                    }

                    // If yes, is its value already present in values array?
                    const valueExist = _attributes[attIdx].values.indexOf(att.value) >= 0;

                    // If not, add the value to the attribute values array
                    return !valueExist ? _attributes[attIdx].values.push(att.value) : null; // Otherwise, do nothing and continue to next iteration
                });
            });

            return _attributes;
        },
        selectedVariant() {
            const formEntries = Object.entries(this.formData);

            return this.variants.find(va => {
                let foundAttributes = 0;

                for (const [key, val] of formEntries) {
                    va.attributes.forEach(att =>
                        att.name === key && att.value === val ? foundAttributes++ : null
                    );
                }

                // If all the attributes names and values from the variant are equal to the expected formData,
                // the selected variant has been found.
                return foundAttributes === formEntries.length;
            });
        },
        _mutationParams() {
            return {
                productid: this.product.id,
                variantid: this.selectedVariant.id,
                price: this.selectedVariant.price
                // Quantity will be set in store
            };
        }
    },
    methods: {
        ...mapMutations('cart', ['MODIFY_CART']),
        addToCart() {
            this.MODIFY_CART(this._mutationParams);
        },
        // Component internal methods not used in template
        _setFormProperties() {
            this.attributes.forEach(att => this.$set(this.formData, att.name, ''));
        },
        _setDefaultVariantValues() {
            const { attributes: defaultVariantAttributes } = this.variants?.find(
                va => va.id === this.product.defaultVariantId
            );

            this.attributes.forEach(va => {
                const { name } = va;
                const { value } = defaultVariantAttributes.find(dva => dva.name === name);

                this.formData[name] = value;
            });
        }
    }
};
</script>

<!-- Style -->
<style lang="scss">
.acquire-checkout-product {
    margin-bottom: 1rem;
}
</style>
