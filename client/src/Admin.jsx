import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Admin() {
  const [product, setProduct] = useState({
    name: '', description: '', price: '', discount: '', sale: false
  });
  const [image, setImage] = useState(null);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    Object.keys(product).forEach(key => formData.append(key, product[key]));
    formData.append('image', image);

    try {
      const response = await axios.post('https://baggify-backendcode.onrender.com/api/products', formData);
      alert('Product added!');
      console.log('Response:', response.data);
    } catch (err) {
      console.error('Error adding product:', err.response?.data || err.message);
      alert('Failed to add product.');
    }
  };

  return (
    <>
    <div className="container my-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '600px' }}>
        <h3 className="mb-4 text-center">Add New Product</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input name="name" className="form-control" placeholder="Product Name" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <textarea name="description" className="form-control" placeholder="Description" onChange={handleChange} rows={3} required />
          </div>
          <div className="mb-3">
            <input name="price" type="number" className="form-control" placeholder="Price" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input name="discount" type="number" className="form-control" placeholder="Discount (%)" onChange={handleChange} />
          </div>
          <div className="form-check mb-3">
            <input name="sale" type="checkbox" className="form-check-input" id="saleCheck" onChange={handleChange} />
            <label className="form-check-label" htmlFor="saleCheck">On Sale?</label>
          </div>
          <div className="mb-3">
            <input type="file" className="form-control" onChange={e => setImage(e.target.files[0])} accept="image/*" />
          </div>
          <button type="submit" className="btn btn-primary w-100">Add Product</button>
          <Link className="custom-button" to="/home">
          
  Go back to Home
</Link> 
<center><h1>or</h1>
<Link to="/update" className="update-link">
  Update Products
</Link>
</center>
        </form>
      </div>
     
    </div>
    

    </>
  );
}
