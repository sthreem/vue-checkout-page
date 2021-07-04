import { shallowMount } from '@vue/test-utils';

import Footer from './Footer.vue';

import { initLocalVue } from '@/tests/helpers';
const { localVue } = initLocalVue();

describe('Footer component', () => {
    it('should render correctly with right id', () => {
        const wrapper = shallowMount(Footer, { localVue });

        expect(wrapper.is(Footer)).toBe(true);
        expect(wrapper.attributes().id).toBe('acquire-checkout-footer');
    });

    it('should render the acquire copyright', () => {
        const wrapper = shallowMount(Footer, { localVue });
        const acquireCopyright = wrapper.find('v-img-stub#acquire-copyright');

        expect(acquireCopyright.exists()).toBe(true);
    });
});
