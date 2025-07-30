import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from './Footer';
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://baggify-backendcode.onrender.com/api/contact', formData);
      if (response.data.success) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (err) {
      setStatus('Failed to send message. Try again later.');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f4f8',
      padding: '20px',
    },
    form: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '30px',
      maxWidth: '500px',
      width: '100%',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Segoe UI, sans-serif',
    },
    heading: {
      fontSize: '2rem',
      fontWeight: '600',
      color: '#333',
      marginBottom: '20px',
      textAlign: 'center',
    },
    input: {
      width: '100%',
      padding: '12px',
      marginBottom: '16px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.2s',
    },
    inputFocus: {
      borderColor: '#007bff',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#007bff',
      color: '#fff',
      fontSize: '1rem',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    status: {
      marginTop: '16px',
      fontSize: '0.95rem',
      color: 'green',
      textAlign: 'center',
    },
    link: {
      display: 'block',
      marginTop: '20px',
      textAlign: 'center',
      color: '#007bff',
      textDecoration: 'none',
    },
  };

  return (
    <>
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Contact Us</h2>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          style={{ ...styles.input, height: '120px', resize: 'vertical' }}
        />
        <button type="submit" style={styles.button}>Send Message</button>
        {status && <p style={styles.status}>{status}</p>}
        <Link to="/home" style={styles.link}>← Back to Home</Link>
      </form>
     
    </div>
     <Footer></Footer>
    </>
  );
};

export default ContactForm;
