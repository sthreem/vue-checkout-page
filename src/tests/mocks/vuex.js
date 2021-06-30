// Global mocks config for unit tests (Ref: https://vue-test-utils.vuejs.org/api/config.html)
import { config } from '@vue/test-utils';

/*
    Default global mocks for this.$store, so tests don't failed outright tests not needing custom mock
    https://vue-test-utils.vuejs.org/guides/#testing-vuex-in-components

    To mock this.$store inside vue component, use localVue pattern from /helpers and pass custom $store mock directly
    See: https://lmiller1990.github.io/vue-testing-handbook/vuex-in-components.html#using-createlocalvue-to-test-store-state

    Note: Store must be accessed with mapState, mapGetters, mapMutations, mapActions instead of this.$store
*/
config.mocks['$store'] = {
    state: {},
    getters: jest.fn().mockImplementation(() => jest.fn().mockReturnValue({})),
    commit: jest.fn().mockReturnValue(),
    dispatch: jest.fn().mockResolvedValue()
};

// VueRouter mocks for "store" outside vue component
jest.mock('@/store', () => ({
    state: {},
    getters: jest.fn().mockImplementation(() => jest.fn().mockReturnValue({})),
    commit: jest.fn().mockReturnValue(),
    dispatch: jest.fn().mockResolvedValue()
}));

export default config;
