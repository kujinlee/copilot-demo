import axios from 'axios';

const getAllProducts = async () => {
  const response = await axios.get('/products');
  return response.data;
};

const minimalProductService = { getAllProducts };

export default minimalProductService;