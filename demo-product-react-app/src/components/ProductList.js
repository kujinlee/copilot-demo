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
    <div className="product-list">
      <h1>Product List</h1>
      <Link to="/products/new" className="btn btn-primary">Add Product</Link>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;