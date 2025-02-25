import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import productService from '../services/productService';
import '../styles/ProductDetail.css';

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    productService.getProduct(id).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

  const handleDelete = () => {
    productService.deleteProduct(id).then(() => {
      history.push('/');
    });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Quantity: {product.quantity}</p>
      <Link to={`/products/${product.id}/edit`} className="btn btn-primary">
        Edit
      </Link>
      <button onClick={handleDelete} className="btn btn-danger">
        Delete
      </button>
    </div>
  );
}

export default ProductDetail;