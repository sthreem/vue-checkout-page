import { shallowMount } from '@vue/test-utils';

import Header, { SELLER } from './Header.vue';

import { initLocalVue } from '@/tests/helpers';
const { localVue } = initLocalVue();

describe('Header component', () => {
    it('should render correctly with right id', () => {
        const wrapper = shallowMount(Header, { localVue });

        expect(wrapper.is(Header)).toBe(true);
        expect(wrapper.attributes().id).toBe('acquire-checkout-header');
    });

    it('should initialize data with correct values', () => {
        const wrapper = shallowMount(Header, { localVue });

        expect(wrapper.vm.sellerName).toBe(SELLER.NAME);
        expect(wrapper.vm.bundleName).toBe(SELLER.BUNDLE_NAME);
        expect(wrapper.vm.bundleDescription).toBe(SELLER.BUNDLE_DESCRIPTION);
    });

    it('should render the seller logo', () => {
        const wrapper = shallowMount(Header, { localVue });
        const sellerLogo = wrapper.find('v-img-stub#seller-logo');

        expect(sellerLogo.exists()).toBe(true);
    });

    it('should render a link to the seller site', () => {
        const wrapper = shallowMount(Header, { localVue });
        const sellerSiteLink = wrapper.find('a#seller-link');

        expect(sellerSiteLink.exists()).toBe(true);
        expect(sellerSiteLink.attributes().href).toBe(wrapper.vm.sellerUrl);
    });

    it('should render the bundle name', () => {
        const wrapper = shallowMount(Header, { localVue });
        const bundleName = wrapper.find('#seller-bundle-name');

        expect(bundleName.exists()).toBe(true);
        expect(bundleName.text()).toBe(wrapper.vm.bundleName);
    });

    it('should render the bundle description', () => {
        const wrapper = shallowMount(Header, { localVue });
        const bundleName = wrapper.find('#seller-bundle-description');

        expect(bundleName.exists()).toBe(true);
        expect(bundleName.text()).toBe(wrapper.vm.bundleDescription);
    });
});
