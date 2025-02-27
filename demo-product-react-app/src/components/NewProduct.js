import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ProductForm from './ProductForm';
import api from '../services/api';

const NewProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: ''
  });
  const history = useHistory();

  const handleSave = async (formData) => {
    // Handle form submission for creating a new product
    try {
      console.log('Product details:', JSON.stringify(formData, null, 2));
      const response = await api.post('/products', formData);
      console.log('New product created successfully:', response.data);
      history.push('/'); // Redirect to the product list page
    } catch (error) {
      console.error('Error creating product:', error.response ? error.response.data : error.message);
    }
  };

  return <ProductForm product={product} onSave={handleSave} />;
};

export default NewProduct;