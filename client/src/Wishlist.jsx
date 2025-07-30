import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './Footer';
export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError('You need to be logged in to view your wishlist.');
      return;
    }

    fetchWishlist();
  }, [token]);

  const fetchWishlist = () => {
    axios
      .get('https://baggify-backendcode.onrender.com/api/wishlist', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setWishlistItems(res.data))
      .catch((err) => {
        console.error('Error fetching wishlist items:', err);
        if (err.response && err.response.status === 401) {
          setError('Your session has expired. Please log in again.');
        } else {
          setError('Failed to fetch wishlist items. Please try again.');
        }
      });
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`https://baggify-backendcode.onrender.com/api/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item._id !== productId)
      );
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      setError('Failed to remove item. Please try again.');
    }
  };

  return (
     <>
    <div className="container my-5">
      <h2 className="mb-4">Your Wishlist</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="row g-4">
        {wishlistItems.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          wishlistItems.map((product) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={product._id}>
              <div className="card h-100 shadow">
                {product.image && (
                  <img
                    src={`https://baggify-backendcode.onrender.com/${product.image.replace(/\\/g, '/')}`}
                    alt={product.name}
                    className="card-img-top"
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  {/* <p className="card-text">{product.description}</p> */}
                  <p>
                    <strong>Price:</strong> ${product.price}
                  </p>
                  <p>
                    <strong>Discount:</strong> {product.discount}%
                  </p>
                  <button
                    className="btn btn-danger mt-auto"
                    onClick={() => removeFromWishlist(product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
     
    </div>
    <Footer></Footer>
   </>
  );
}
