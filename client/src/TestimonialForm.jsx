import { useState } from 'react';
import axios from 'axios';

const styles = {
  form: {
    marginTop: '20px',
    marginBottom: '40px',
    marginLeft: 'auto',
    marginRight: 'auto',
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    fontFamily: 'sans-serif',
  },
  heading: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 16px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '10px',
    color: 'green',
  },
};

const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rating: 5,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/testimonials', formData);
      setMessage('Thank you for your feedback!');
      setFormData({ name: '', description: '', rating: 5 });
    } catch (err) {
      setMessage('Submission failed. Please try again.');
    }
  };

  return (
    <div style={{ paddingTop: '10px' }}> {/* Add this div wrapper to control spacing */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Your Review Matters! ❤️</h2>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="description"
          placeholder="Your Feedback"
          value={formData.description}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          style={styles.input}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <option key={star} value={star}>
              {star} Star{star > 1 ? 's' : ''}
            </option>
          ))}
        </select>
        <button type="submit" style={styles.button}>
          Submit
        </button>
        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

export default TestimonialForm;
