import React, { useEffect, useState } from 'react';
import '../styles/ProductForm.css';

const ProductForm = ({ product, onSave }) => {
  const [formData, setFormData] = useState(product);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.quantity) newErrors.quantity = 'Quantity is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <div className="error">{errors.description}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="text"
          className="form-control"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        {errors.price && <div className="error">{errors.price}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Quantity</label>
        <input
          type="text"
          className="form-control"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
        {errors.quantity && <div className="error">{errors.quantity}</div>}
      </div>
      <button type="submit" className="btn btn-primary mt-3">Save</button>
    </form>
  );
};

export default ProductForm;