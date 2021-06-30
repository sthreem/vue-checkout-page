import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld/Index.vue';

describe('HelloWorld component', () => {
    it('should render properly', () => {
        const wrapper = shallowMount(HelloWorld);
        expect(wrapper.exists()).toBe(true);
    });
});
