import { api } from './productService';
import MockAdapter from 'axios-mock-adapter';
import productService from './productService';

describe('productService', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(api);
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
      const result = await productService.getAllProducts();
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

  it('should fetch a product by ID', async () => {
    const product = { id: 1, name: 'Product 1', description: 'Description 1', price: 10, quantity: 100 };

    mock.onGet('/products/1').reply(200, product);
    console.log('Mock GET /products/1 set up');

    try {
      const result = await productService.getProduct(1);
      console.log('Fetch product by ID result:', result);
      expect(result).toEqual(product);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      console.log('Error details:', {
        config: error.config,
        request: error.request,
        response: error.response,
      });
      throw error; // Rethrow the error to ensure the test fails
    }
  });

  it('should create a new product', async () => {
    const newProduct = { name: 'Product 3', description: 'Description 3', price: 30, quantity: 300 };
    const createdProduct = { id: 3, ...newProduct };

    mock.onPost('/products').reply(201, createdProduct);
    console.log('Mock POST /products set up');

    try {
      const result = await productService.createProduct(newProduct);
      console.log('Create product result:', result);
      expect(result).toEqual(createdProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      console.log('Error details:', {
        config: error.config,
        request: error.request,
        response: error.response,
      });
      throw error; // Rethrow the error to ensure the test fails
    }
  });

  it('should update a product', async () => {
    const updatedProduct = { name: 'Updated Product 1', description: 'Updated Description 1', price: 15, quantity: 150 };

    mock.onPut('/products/1').reply(200, updatedProduct);
    console.log('Mock PUT /products/1 set up');

    try {
      const result = await productService.updateProduct(1, updatedProduct);
      console.log('Update product result:', result);
      expect(result).toEqual(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      console.log('Error details:', {
        config: error.config,
        request: error.request,
        response: error.response,
      });
      throw error; // Rethrow the error to ensure the test fails
    }
  });

  it('should delete a product', async () => {
    mock.onDelete('/products/1').reply(204);
    console.log('Mock DELETE /products/1 set up');

    try {
      const result = await productService.deleteProduct(1);
      console.log('Delete product result:', result);
      expect(result).toBeUndefined();
    } catch (error) {
      console.error('Error deleting product:', error);
      console.log('Error details:', {
        config: error.config,
        request: error.request,
        response: error.response,
      });
      throw error; // Rethrow the error to ensure the test fails
    }
  });
});