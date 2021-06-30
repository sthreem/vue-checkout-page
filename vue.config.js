const path = require('path');

module.exports = {
    transpileDependencies: ['vuetify'],
    lintOnSave: true,
    configureWebpack: webpackConfig => {
        // Enable sourcemap for dev build so we can debug javascript
        webpackConfig.devtool = 'source-map';
        // App entry point
        webpackConfig.entry = {
            appVueLib: path.join(__dirname, './src', 'main.js')
        };
    }
};
