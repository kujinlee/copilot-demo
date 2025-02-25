import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import productService from '../services/productService';
import '../styles/ProductForm.css';

function ProductForm() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: ''
  });
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      productService.getProduct(id).then((response) => {
        setProduct(response.data);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      productService.updateProduct(id, product).then(() => {
        history.push('/');
      });
    } else {
      productService.createProduct(product).then(() => {
        history.push('/');
      });
    }
  };

  return (
    <div className="container product-form">
      <h1 className="my-4">{id ? 'Edit Product' : 'Add Product'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {id ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;