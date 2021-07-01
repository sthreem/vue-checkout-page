jest.mock('./modules/cart', () => 'cartModule');
jest.mock('./modules/products', () => 'productsModule');

import store from './index.js';

describe('store configuration', () => {
    it('should export all submodules', () => {
        expect(store).toEqual({
            cart: 'cartModule',
            products: 'productsModule'
        });
    });
});
