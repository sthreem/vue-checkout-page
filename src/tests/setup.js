import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);
Vue.config.productionTip = false;

// Global setup for each test suite
beforeAll(() => {
    jest.useFakeTimers();
});
afterAll(() => {});
// Setup for each test
beforeEach(() => {
    jest.clearAllMocks(); // Reset all previous mock calls and instances
    jest.spyOn(console, 'log').mockImplementation(() => {}); // Disabling console log from jest output (you can still use console.warn to debug tests...)
});
afterEach(() => {
    jest.clearAllTimers(); // Clear all timers and intervals
    jest.restoreAllMocks(); // Restore all mocks after each test
});
