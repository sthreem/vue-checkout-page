import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

export function initLocalVue() {
    const localVue = createLocalVue();

    localVue.use(Vuex);

    return { localVue, Vuex };
}
