import { useEffect, useState } from 'react';
import axios from 'axios';

const TestimonialList = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios
      .get('https://baggify-backendcode.onrender.com/api/testimonials')
      .then((res) => setTestimonials(res.data))
      .catch((err) => console.error('Error fetching testimonials:', err));
  }, []);

  const styles = {
    container: {
      fontFamily: 'sans-serif',
      padding: '40px 20px',
      backgroundColor: '#f920',
      display: 'flex',
      justifyContent: 'center',
      marginBottom:'100px'
    },
    contentWrapper: {
      width: '80%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    heading: {
      fontSize: '2rem',
      fontWeight: '600',
      marginBottom: '30px',
      textAlign: 'center',
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)', // Ensures 3 cards per row
      gap: '20px',
      justifyContent: 'center', // Centers the grid horizontally
      alignItems: 'center', // Aligns cards vertically
    },
    card: {
      width: '280px',
      height: '280px',
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 10px rgba(32, 26, 26, 0.99)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      textAlign: 'center',
      
    },
    name: {
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '8px',
      color: '#333',
    },
    description: {
      fontSize: '0.95rem',
      color: '#555',
      flexGrow: 1,
    },
    rating: {
      fontWeight: '500',
      color: '#f5b301',
      marginTop: '10px',
    },
    emptyText: {
      textAlign: 'center',
      fontStyle: 'italic',
      color: '#777',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <h2 style={styles.heading}> See What People's Say About Us</h2>
        {testimonials.length === 0 ? (
          <p style={styles.emptyText}>No testimonials yet.</p>
        ) : (
          <div style={styles.gridContainer}>
            {testimonials.map((testimonial) => (
              <div key={testimonial._id} style={styles.card}>
                <div>
                  <h3 style={styles.name}>{testimonial.name}</h3>
                  <p style={styles.description}>{testimonial.description}</p>
                </div>
                <p style={styles.rating}>Rating: {testimonial.rating} ⭐</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialList;