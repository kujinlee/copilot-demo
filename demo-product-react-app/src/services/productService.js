import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5001' // Replace with your API base URL
});

const productService = {
  getAllProducts: async () => {
    const url = '/products';
    console.log(`Making GET request to ${api.defaults.baseURL}${url}`);
    try {
      const response = await api.get(url);
      console.log('Full response:', response);
      return response.data;
    } catch (error) {
      console.error('Error in getAllProducts:', error);
      throw error;
    }
  },
  getProduct: async (id) => {
    const url = `/products/${id}`;
    console.log(`Making GET request to ${api.defaults.baseURL}${url}`);
    try {
      const response = await api.get(url);
      console.log('Full response:', response);
      return response.data;
    } catch (error) {
      console.error('Error in getProduct:', error);
      throw error;
    }
  },
  createProduct: async (product) => {
    const url = '/products';
    console.log(`Making POST request to ${api.defaults.baseURL}${url}`, product);
    try {
      const response = await api.post(url, product);
      console.log('Full response:', response);
      return response.data;
    } catch (error) {
      console.error('Error in createProduct:', error);
      throw error;
    }
  },
  updateProduct: async (id, product) => {
    const url = `/products/${id}`;
    console.log(`Making PUT request to ${api.defaults.baseURL}${url}`, product);
    try {
      const response = await api.put(url, product);
      console.log('Full response:', response);
      return response.data;
    } catch (error) {
      console.error('Error in updateProduct:', error);
      throw error;
    }
  },
  deleteProduct: async (id) => {
    const url = `/products/${id}`;
    console.log(`Making DELETE request to ${api.defaults.baseURL}${url}`);
    try {
      const response = await api.delete(url);
      console.log('Full response:', response);
      return response.data;
    } catch (error) {
      console.error('Error in deleteProduct:', error);
      throw error;
    }
  }
};

export default productService;