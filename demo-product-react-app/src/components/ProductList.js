import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import productService from '../services/productService';
import '../styles/ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService.getAllProducts().then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <div className="container product-list">
      <h1 className="my-4">Product List</h1>
      <Link to="/products/new" className="btn btn-primary mb-3">Add Product</Link>
      <ul className="list-group">
        {products.map((product) => (
          <li key={product.id} className="list-group-item">
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;