// Success.jsx
import React, { useEffect } from 'react';
import axios from 'axios';

const Success = () => {
  console.log('aaaa')
  // useEffect(() => {
  //   const finalizeOrder = async () => {
  //     const token = localStorage.getItem('token');
  //     const sessionId = new URLSearchParams(window.location.search).get('session_id');
  //     if (!token || !sessionId) return;

  //     try {
  //       // ✅ Get Stripe session details from your backend
  //       const res = await axios.get(`http://localhost:3001/api/checkout/session/${sessionId}`);
  //       const session = res.data;

  //       const { id: paymentId, customer_details, metadata } = session;
  //       const email = customer_details?.email || '';

  //       // ✅ Get the current user's cart
  //       const cartRes = await axios.get('http://localhost:3001/api/cart', {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       const products = cartRes.data.map(product => ({
  //         name: product.name,
  //         price: product.price,
  //       }));

  //       // ✅ Send order to backend
  //       await axios.post(
  //         'http://localhost:3001/api/orders',
  //         {
  //           paymentId,
  //           email,
  //           products,
  //         },
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );

  //     } catch (err) {
  //       console.error('Error finalizing order:', err);
  //     }
  //   };

  //   finalizeOrder();
  // }, []);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Thank you for your purchase!</h1>
      <p>Your order has been successfully placed.</p>
    </div>
  );
};

export default Success;
