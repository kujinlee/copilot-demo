import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ProductForm from './ProductForm';
import api from '../services/api';

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSave = async (formData) => {
    try {
      await api.put(`/products/${id}`, formData);
      console.log('Product updated successfully');
      history.push('/'); // Redirect to the product list page
    } catch (error) {
      console.error('Error updating product:', error.response ? error.response.data : error.message);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return <ProductForm product={product} onSave={handleSave} />;
};

export default EditProduct;