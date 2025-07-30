import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    const res = await fetch('https://baggify-backendcode.onrender.com/api/products');
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    const res = await fetch(`https://baggify-backendcode.onrender.com/api/products/${id}`, {
      method: 'DELETE'
    });

    const data = await res.json();
    if (data.success) {
      alert("Product deleted");
      fetchProducts();
    } else {
      alert("Delete failed");
    }
  };

  const handleEdit = (product) => {
    setEditProduct({ ...product });
  };

  const handleUpdate = async () => {
    const res = await fetch(`https://baggify-backendcode.onrender.com/api/products/${editProduct._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editProduct)
    });

    const data = await res.json();
    alert("Product updated");
    setEditProduct(null);
    fetchProducts();
  };

  return (
    <>
    <div className="product-manager">
      <h2>Hiii! how its Going?</h2>

      {editProduct && (
        <div className="edit-form">
          <h3>Update Product</h3>
          <input
            type="text"
            placeholder="Name"
            value={editProduct.name}
            onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={editProduct.description}
            onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={editProduct.price}
            onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
          />
          <input
            type="number"
            placeholder="Discount"
            value={editProduct.discount}
            onChange={(e) => setEditProduct({ ...editProduct, discount: e.target.value })}
          />
          <input
            type="text"
            placeholder="Sale"
            value={editProduct.sale}
            onChange={(e) => setEditProduct({ ...editProduct, sale: e.target.value })}
          />
          <button onClick={handleUpdate} className="btn btn-success">Save</button>
          <button onClick={() => setEditProduct(null)} className="btn btn-secondary">Cancel</button>
        </div>
      )}

      {products.map((product) => (
        <div key={product._id} className="product-card">
          <h4>{product.name}</h4>
          <p>{product.description}</p>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Discount:</strong> {product.discount}%</p>
          <p><strong>Sale:</strong> {product.sale}</p>
          <button onClick={() => handleEdit(product)} className="btn btn-primary" style={{ marginRight: 10 }}>
            Edit
          </button>
          <button onClick={() => handleDelete(product._id)} className="btn btn-danger">
            Delete
          </button>
           
        </div>
      ))}
     <center><h1></h1>
     <Link to="/home" className="update-link">
       Go back to home 
     </Link>
     </center>
    </div>

 </>
  );
};

export default ProductManager;
