import axios from 'axios';

export const PRODUCTS_ENDPOINT = 'https://www.npoint.io/docs/ec39ab1aa4edf145235a';

export class ProductsService {
    constructor() {}

    async getProducts() {
        return await axios.get(PRODUCTS_ENDPOINT);
    }
}

export default new ProductsService();
