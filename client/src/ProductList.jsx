
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './Footer';
import { FaShoppingCart, FaHeart, FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState(''); // New state
  const [selectedBrand, setSelectedBrand] = useState(''); // State for brand filter

  useEffect(() => {
    if (!token) {
      alert('Please log in to view products');
      return;
    }

    axios
      .get('http://localhost:3001/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err));
  }, [token]);

  const addToCart = async (productId) => {
    if (!token) {
      alert('Please log in to add items to your cart');
      return;
    }

    try {
      await axios.post(`http://localhost:3001/api/cart/${productId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Added to cart!');
    } catch (error) {
      alert('Failed to add to cart.');
      console.error(error);
    }
  };

  const addToWishlist = async (productId) => {
    if (!token) {
      alert('Please log in to add items to your wishlist');
      return;
    }

    try {
      await axios.post(`http://localhost:3001/api/wishlist/${productId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Added to wishlist!');
    } catch (error) {
      alert('Failed to add to wishlist.');
      console.error(error);
    }
  };

  // Filter products by name (case-insensitive)
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedBrand ? product.name.toLowerCase().includes(selectedBrand.toLowerCase()) : true) // Filter by brand
  );

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'discount-high-low':
        return b.discount - a.discount;
      case 'discount-low-high':
        return a.discount - b.discount;
      default:
        return 0;
    }
  });

  return (
    <>
      <div className="container product-list-container">
        <h2 className="text-center mb-4">All Products</h2>

        {/* Top bar */}
        <div className="Icons-carts-wishlist d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <div className="mb-2">
            <Link to='/cart' className='me-3'><FaShoppingCart /></Link>
            <Link to='/wishlist'><FaHeart /></Link>
          </div>

          <div className="search-button-container d-flex align-items-center mb-2">
            <input
              type="text"
              placeholder="Search products..."
              className="form-control me-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-secondary"><FaSearch /></button>
          </div>

          {/* Sort dropdown */}
          <div className="ms-2 mb-2">
            <select
              className="form-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="discount-high-low">Discount: High to Low</option>
              <option value="discount-low-high">Discount: Low to High</option>
            </select>
          </div>

          {/* Brand filter */}
          <div className="ms-2 mb-2">
            <input
              type="text"
              placeholder="Filter by brand (e.g., Gucci, Fossil)"
              className="form-control"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="row g-4">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={product._id}>
                <div
                  className="card product-card h-100 shadow animate-card"
                  onClick={() => setSelectedProduct(product)}
                  style={{ cursor: 'pointer' }}
                >
                  {product.image && (
                    <img
                      src={`http://localhost:3001/${product.image.replace(/\\/g, '/')}`}
                      alt={product.name}
                      className="card-img-top product-image"
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className='card-discount-new'>Discount: {product.discount}%</p>
                    <p className='card-price-new'>Price: ${product.price}</p>
                    <button
                      className="btn btn-secondary mt-auto animate-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToWishlist(product._id);
                      }}
                    >
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>

      {/* Side Panel */}
      {selectedProduct && (
        <div className="product-panel open">
          <button className="close-btn" onClick={() => setSelectedProduct(null)}>×</button>
          <h3>{selectedProduct.name}</h3>
          <p>{selectedProduct.description}</p>
          <ul className="list-unstyled">
            <li><strong>Price:</strong> ${selectedProduct.price}</li>
            <li><strong>Discount:</strong> {selectedProduct.discount}%</li>
            <li>
              <strong>Sale:</strong>{' '}
              <span className={selectedProduct.sale ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                {selectedProduct.sale ? 'Yes' : 'No'}
              </span>
            </li>
          </ul>
          <div className="mt-3 d-grid gap-2">
            <button className="btn btn-primary animate-btn" onClick={() => addToCart(selectedProduct._id)}>
              Add to Cart
            </button>
          </div>
        </div>
      )}

      <Footer />

      {/* Internal CSS with animations */}
      <style>{`
        .product-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .product-card:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .animate-btn {
          transition: background-color 0.3s ease;
        }

        .animate-btn:hover {
          background-color:rgb(75, 33, 201);
        }

        .animate-card {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .product-panel {
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}

















































































// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Footer from './Footer';
// import { FaShoppingCart, FaHeart, FaSearch } from "react-icons/fa";
// import { Link } from 'react-router-dom';

// export default function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortOption, setSortOption] = useState(''); // New state
//   const [selectedBrand, setSelectedBrand] = useState(''); // State for brand filter

//   useEffect(() => {
//     if (!token) {
//       alert('Please log in to view products');
//       return;
//     }

//     axios
//       .get('http://localhost:3001/api/products')
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error('Error fetching products:', err));
//   }, [token]);

//   const addToCart = async (productId) => {
//     if (!token) {
//       alert('Please log in to add items to your cart');
//       return;
//     }

//     try {
//       await axios.post(`http://localhost:3001/api/cart/${productId}`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert('Added to cart!');
//     } catch (error) {
//       alert('Failed to add to cart.');
//       console.error(error);
//     }
//   };

//   const addToWishlist = async (productId) => {
//     if (!token) {
//       alert('Please log in to add items to your wishlist');
//       return;
//     }

//     try {
//       await axios.post(`http://localhost:3001/api/wishlist/${productId}`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert('Added to wishlist!');
//     } catch (error) {
//       alert('Failed to add to wishlist.');
//       console.error(error);
//     }
//   };

//   // Filter products by name (case-insensitive)
//   const filteredProducts = products.filter(product =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//     (selectedBrand ? product.name.toLowerCase().includes(selectedBrand.toLowerCase()) : true) // Filter by brand
//   );

//   // Sort products based on selected option
//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     switch (sortOption) {
//       case 'price-low-high':
//         return a.price - b.price;
//       case 'price-high-low':
//         return b.price - a.price;
//       case 'discount-high-low':
//         return b.discount - a.discount;
//       case 'discount-low-high':
//         return a.discount - b.discount;
//       default:
//         return 0;
//     }
//   });

//   return (
//     <>
//       <div className="container product-list-container">
//         <h2 className="text-center mb-4">All Products</h2>

//         {/* Top bar */}
//         <div className="Icons-carts-wishlist d-flex justify-content-between align-items-center mb-4 flex-wrap">
//           <div className="mb-2">
//             <Link to='/cart' className='me-3'><FaShoppingCart /></Link>
//             <Link to='/wishlist'><FaHeart /></Link>
//           </div>

//           <div className="search-button-container d-flex align-items-center mb-2">
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="form-control me-2"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button className="btn btn-secondary"><FaSearch /></button>
//           </div>

//           {/* Sort dropdown */}
//           <div className="ms-2 mb-2">
//             <select
//               className="form-select"
//               value={sortOption}
//               onChange={(e) => setSortOption(e.target.value)}
//             >
//               <option value="">Sort By</option>
//               <option value="price-low-high">Price: Low to High</option>
//               <option value="price-high-low">Price: High to Low</option>
//               <option value="discount-high-low">Discount: High to Low</option>
//               <option value="discount-low-high">Discount: Low to High</option>
//             </select>
//           </div>

//           {/* Brand filter */}
//           <div className="ms-2 mb-2">
//             <input
//               type="text"
//               placeholder="Filter by brand (e.g., Gucci, Fossil)"
//               className="form-control"
//               value={selectedBrand}
//               onChange={(e) => setSelectedBrand(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Product Grid */}
//         <div className="row g-4">
//           {sortedProducts.length > 0 ? (
//             sortedProducts.map((product) => (
//               <div className="col-sm-6 col-md-4 col-lg-3" key={product._id}>
//                 <div
//                   className="card product-card h-100 shadow"
//                   onClick={() => setSelectedProduct(product)}
//                   style={{ cursor: 'pointer' }}
//                 >
//                   {product.image && (
//                     <img
//                       src={`http://localhost:3001/${product.image.replace(/\\/g, '/')}`}
//                       alt={product.name}
//                       className="card-img-top product-image"
//                     />
//                   )}
//                   <div className="card-body d-flex flex-column">
//                     <h5 className="card-title">{product.name}</h5>
//                     <p className='card-discount-new'>Discount: {product.discount}%</p>
//                     <p className='card-price-new'>Price: ${product.price}</p>
//                     <button
//                       className="btn btn-secondary mt-auto"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         addToWishlist(product._id);
//                       }}
//                     >
//                       Add to Wishlist
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No products found.</p>
//           )}
//         </div>
//       </div>

//       {/* Side Panel */}
//       {selectedProduct && (
//         <div className="product-panel open">
//           <button className="close-btn" onClick={() => setSelectedProduct(null)}>×</button>
//           <h3>{selectedProduct.name}</h3>
//           <p>{selectedProduct.description}</p>
//           <ul className="list-unstyled">
//             <li><strong>Price:</strong> ${selectedProduct.price}</li>
//             <li><strong>Discount:</strong> {selectedProduct.discount}%</li>
//             <li>
//               <strong>Sale:</strong>{' '}
//               <span className={selectedProduct.sale ? 'text-success fw-bold' : 'text-danger fw-bold'}>
//                 {selectedProduct.sale ? 'Yes' : 'No'}
//               </span>
//             </li>
//           </ul>
//           <div className="mt-3 d-grid gap-2">
//             <button className="btn btn-primary" onClick={() => addToCart(selectedProduct._id)}>
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </>
//   );
// }















































































































































































































































































































































































