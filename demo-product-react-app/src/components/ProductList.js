import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import productService from '../services/productService';
import '../styles/ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService.getAllProducts()
      .then((response) => {
        console.log('API response:', response);
        if (response && Array.isArray(response)) {
          setProducts(response);
        } else {
          console.error('Unexpected response data:', response);
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleDelete = (id) => {
    productService.deleteProduct(id)
      .then(() => {
        setProducts(products.filter(product => product.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  return (
    <div className="container product-list">
      <h1 className="my-4">Product List</h1>
      <Link to="/products/new" className="btn btn-primary mb-3">Add Product</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                </td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <Link to={`/products/${product.id}/edit`} className="btn btn-link btn-sm mr-2">Edit</Link>
                  <button onClick={() => handleDelete(product.id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No products available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;