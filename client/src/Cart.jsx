import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './Footer';

const CartItemsGrid = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({
    name: '',
    mobile: '',
    street: '',
    locality: '',
    city: '',
    state: '',
    pincode: ''
  });

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token');
      if (!token) return alert('Please login to view your cart.');

      try {
        const res = await axios.get('https://baggify-backendcode.onrender.com/api/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(res.data);
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Please login first.');

    try {
      await axios.delete(`https://baggify-backendcode.onrender.com/api/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(cartItems.filter((item) => item._id !== productId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Please login first.');

    const { name, mobile, street, locality, city, state, pincode } = address;
    if (!name || !mobile || !street || !locality || !city || !state || !pincode) {
      return alert('Please fill in all address fields.');
    }

    try {
      const res = await axios.post(
        'https://baggify-backendcode.onrender.com/api/checkout',
        { address },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        alert('Failed to initiate checkout. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div style={styles.page}>
        <div style={styles.cartWrapper}>
          <h2 style={styles.heading}>Your Cart</h2>

          {cartItems.length === 0 ? (
            <p style={{ textAlign: 'center' }}>Your cart is empty.</p>
          ) : (
            <div style={styles.itemsContainer}>
              {cartItems.map((item) => (
                <div key={item._id} style={styles.card}>
                  <img
                    src={`https://baggify-backendcode.onrender.com/${item.image}`}
                    alt={item.name}
                    style={styles.image}
                  />
                  <h3>{item.name}</h3>
                  <p style={styles.discount}>Discount: {item.discount}%</p>
                  <p style={styles.price}>Price: ${item.price}</p>
                  <button
                    style={{ ...styles.button, backgroundColor: 'red' }}
                    onClick={() => handleRemoveFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {cartItems.length > 0 && (
            <>
              <h3 style={styles.subHeading}>Shipping Address</h3>
              <div style={styles.addressForm}>
                <input type="text" name="name" placeholder="Full Name" value={address.name} onChange={handleInputChange} style={styles.input} />
                <input type="text" name="mobile" placeholder="Mobile Number" value={address.mobile} onChange={handleInputChange} style={styles.input} />
                <input type="text" name="street" placeholder="Street Address" value={address.street} onChange={handleInputChange} style={styles.input} />
                <input type="text" name="locality" placeholder="Locality" value={address.locality} onChange={handleInputChange} style={styles.input} />
                <input type="text" name="city" placeholder="City" value={address.city} onChange={handleInputChange} style={styles.input} />
                <input type="text" name="state" placeholder="State" value={address.state} onChange={handleInputChange} style={styles.input} />
                <input type="text" name="pincode" placeholder="Pincode" value={address.pincode} onChange={handleInputChange} style={styles.input} />
              </div>

              <button style={styles.checkoutButton} onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    padding: '40px 0',
    display: 'flex',
    justifyContent: 'center',
  },
  cartWrapper: {
    width: '90%',
    maxWidth: '1000px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
  },
  subHeading: {
    marginTop: '40px',
    marginBottom: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  itemsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  card: {
    width: '200px',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    padding: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'contain',
    marginBottom: '10px',
  },
  discount: {
    color: '#007bff',
    fontSize: '14px',
  },
  price: {
    color: '#e60023',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  button: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    fontWeight: 'bold',
    width: '100%',
  },
  addressForm: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    margin: '20px 0',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
    width: '100%',
  },
  checkoutButton: {
    marginTop: '10px',
    padding: '15px 30px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

export default CartItemsGrid;






































































































// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Footer from './Footer';

// const CartItemsGrid = () => {
//   const [cartItems, setCartItems] = useState([]);
//   useEffect(() => {
//     const fetchCartItems = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) return alert('Please login to view your cart.');

//       try {
//         const res = await axios.get('http://localhost:3001/api/cart', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCartItems(res.data);
//       } catch (error) {
//         console.error('Failed to fetch cart items:', error);
//       }
//     };

//     fetchCartItems();
//   }, []);

//   const handleRemoveFromCart = async (productId) => {
//     const token = localStorage.getItem('token');
//     if (!token) return alert('Please login first.');

//     try {
//       await axios.delete(`http://localhost:3001/api/cart/${productId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCartItems(cartItems.filter((item) => item._id !== productId));
//     } catch (error) {
//       console.error('Error removing item from cart:', error);
//     }
//   };

//   const handleCheckout = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) return alert('Please login first.');

//     try {
//       const res = await axios.post(
//         'http://localhost:3001/api/checkout',
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (res.data.url) {
//         window.location.href = res.data.url;
//       } else {
//         alert('Failed to initiate checkout. Please try again.');
//       }
//     } catch (error) {
//       console.error('Checkout error:', error);
//       alert('Checkout failed. Please try again.');
//     }
//   };

//   return (
//     <>
//       <div>
//         <h2 style={{ textAlign: 'center', marginTop: '30px' }}>Your Cart</h2>
//         <div style={styles.container}>
//           {cartItems.length === 0 ? (
//             <p style={{ textAlign: 'center' }}>Your cart is empty.</p>
//           ) : (
//             cartItems.map((item) => (
//               <div key={item._id} style={styles.card}>
//                 <img
//                   src={`http://localhost:3001/${item.image}`}
//                   alt={item.name}
//                   style={styles.image}
//                 />
//                 <h3>{item.name}</h3>
//                 <p style={styles.discount}>discount: {item.discount}%</p>
//                 <p style={styles.price}>price: ${item.price}</p>
//                 <button
//                   style={{ ...styles.button, backgroundColor: 'red' }}
//                   onClick={() => handleRemoveFromCart(item._id)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))
//           )}
//         </div>

//         {cartItems.length > 0 && (
//           <div style={styles.checkoutContainer}>
//             <button style={styles.checkoutButton} onClick={handleCheckout}>
//               Proceed to Checkout
//             </button>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     gap: '20px',
//     justifyContent: 'center',
//     padding: '40px 20px',
//     backgroundColor: '#fffff',
//   },
//   card: {
//     width: '220px',
//     borderRadius: '10px',
//     backgroundColor: '#fff',
//     padding: '15px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     textAlign: 'center',
//     transition: 'transform 0.2s',
//   },
//   image: {
//     width: '100%',
//     height: '160px',
//     objectFit: 'contain',
//     marginBottom: '10px',
//   },
//   discount: {
//     color: 'dodgerblue',
//     margin: '5px 0',
//   },
//   price: {
//     color: 'red',
//     fontWeight: 'bold',
//     margin: '5px 0',
//   },
//   button: {
//     marginTop: '10px',
//     padding: '10px',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     cursor: 'pointer',
//     borderRadius: '5px',
//     fontWeight: 'bold',
//   },
//   checkoutContainer: {
//     textAlign: 'center',
//     margin: '30px 0',
//   },
//   checkoutButton: {
//     padding: '15px 30px',
//     fontSize: '16px',
//     backgroundColor: '#28a745',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     fontWeight: 'bold',
//   },
// };

// export default CartItemsGrid;

 





























