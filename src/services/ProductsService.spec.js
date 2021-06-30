import axios from 'axios';

import ProductsServiceInstance, { ProductsService, PRODUCTS_ENDPOINT } from './ProductsService';

it('should exports right public methods', () => {
    const publicMethodNames = Object.getOwnPropertyNames(
        Object.getPrototypeOf(ProductsServiceInstance)
    ).filter(n => n !== 'constructor' && !n.startsWith('_')); // Removing constructor and private methods

    expect(publicMethodNames).toEqual(['getProducts']);
});

describe('constructor', () => {
    beforeEach(() => {
        new ProductsService();
    });

    it('should do nothing', () => {
        expect(true).toEqual(true);
    });
});

describe('getProducts function', () => {
    const products = {};

    beforeEach(() => {
        axios.get.mockResolvedValue(products);
    });

    it('should execute axios.get once with right endpoint', async () => {
        await ProductsServiceInstance.getProducts();

        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(PRODUCTS_ENDPOINT);
    });

    it('should return axios.get request result', async () => {
        const result = await ProductsServiceInstance.getProducts();

        expect(result).toEqual(products);
    });
});
