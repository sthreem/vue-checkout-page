import { shallowMount } from '@vue/test-utils';
import App from './App.vue';

import { initLocalVue } from '@/tests/helpers';
const { localVue } = initLocalVue();

describe('App component', () => {
    it('should render properly', () => {
        const wrapper = shallowMount(App, { localVue });
        console.warn(wrapper.html());
        expect(wrapper.exists()).toBe(true);
    });
});
