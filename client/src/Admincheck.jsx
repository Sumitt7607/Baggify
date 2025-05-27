import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
const AdminCheck = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isAllowed, setIsAllowed] = useState(false);

  const adminEmails = [
    "sumitkushwahatg@gmail.com",
    "user@gmail.com",
    "admin3@example.com"
  ];

  const verifiedUsers = {
    "sumitkushwahatg@gmail.com": true,
    "user@gmail.com": false, // simulate unverified user
    "admin3@example.com": true
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();

    if (!adminEmails.includes(trimmedEmail)) {
      setMessage("❌ Not authorized as admin.");
      setIsAllowed(false);
    } else if (!verifiedUsers[trimmedEmail]) {
      setMessage("⚠️ Email not verified.");
      setIsAllowed(false);
    } else {
      setMessage("✅ Access granted ");
      setIsAllowed(true);
    }
  };

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '100px auto',
      padding: '30px',
      border: '1px solid #ddd',
      borderRadius: '12px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif',
     
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#333'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      borderRadius: '6px',
      border: '1px solid #ccc'
    },
    button: {
      padding: '10px',
      backgroundColor: '#007BFF',
      color: 'white',
      fontSize: '16px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    },
    buttonHover: {
      backgroundColor: '#0056b3'
    },
    message: {
      marginTop: '15px',
      textAlign: 'center',
      fontWeight: 'bold'
    },
    link: {
      marginTop: '10px',
      display: 'block',
      textAlign: 'center',
      color: '#28a745',
      textDecoration: 'none',
      fontWeight: 'bold'
    },
    links: {
      display: 'block',
      marginTop: '20px',
      textAlign: 'center',
      color: '#007bff',
      textDecoration: 'none',
    },
  };

  return (
    <>
   <div className='Admin-Body-check'>
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Access Check</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Check Access</button>
      </form>

      <p style={styles.message}>{message}</p>

      {isAllowed && (
        <a href="/admin" style={styles.link}>Add New Products</a>
      )}
     <Link to={'/home'} style={styles.links}  >go back to home</Link>
    </div>
   <Footer></Footer>
    </div>
     
    </>
  );
};

export default AdminCheck;
