import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import minimalProductService from './minimalProductService';

// Set the base URL for axios
axios.defaults.baseURL = 'http://localhost:5001';

describe('minimalProductService', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    console.log('Mock adapter created');
  });

  afterEach(() => {
    mock.restore();
    console.log('Mock adapter restored');
  });

  it('should fetch all products', async () => {
    const products = [
      { id: 1, name: 'Product 1', description: 'Description 1', price: 10, quantity: 100 },
      { id: 2, name: 'Product 2', description: 'Description 2', price: 20, quantity: 200 },
    ];

    mock.onGet('/products').reply(200, products);
    console.log('Mock GET /products set up');

    try {
      const result = await minimalProductService.getAllProducts();
      console.log('Fetch all products result:', result);
      expect(result).toEqual(products);
    } catch (error) {
      console.error('Error fetching all products:', error);
      console.log('Error details:', {
        config: error.config,
        request: error.request,
        response: error.response,
      });
      throw error; // Rethrow the error to ensure the test fails
    }
  });
});