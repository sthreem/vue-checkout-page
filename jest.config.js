module.exports = {
    // Vue presets
    preset: '@vue/cli-plugin-unit-jest',
    // Setup files
    setupFiles: [
        './src/tests/config.js' // global mocks
    ],
    setupFilesAfterEnv: [
        './src/tests/setup.js' // local/global tests setup
    ],
    automock: false, // mocking is done manually for each test file
    // Tests patterns
    testMatch: ['**/*.spec.js?(x)'],
    testPathIgnorePatterns: ['[\\/]node_modules[\\/]'],
    // Coverage setup
    collectCoverage: true,
    coverageReporters: ['lcov', 'text'],
    collectCoverageFrom: [
        'src/**/*.{js,vue}',
        '!src/*.js' // Config files are not tested for now...
    ],
    coveragePathIgnorePatterns: [
        'src/tests/.*',
        '[\\/]node_modules[\\/]',
        '[\\/]_ngVueBridgeCode[\\/]'
    ]
};
