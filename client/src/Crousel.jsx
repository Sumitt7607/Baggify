import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import image1 from './assets/bag1.png';
import image2 from './assets/bag2.png';
import image3 from './assets/bag3.png';

const styles = {
  container: {
    position: "relative",
    width: "1000px",
    height: "500px",
    margin: "110px auto ",
   
    overflow: "hidden",
    borderRadius: "15px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
    fontFamily: "sans-serif"
  },
  imageContainer: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    overflow:"hidden",
    borderRadius: "15px"
  },
  overlayText: {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#fff",
    fontSize: "40px",
    fontWeight: "bold",
    textShadow: "2px 2px 10px rgba(0,0,0,0.6)"
  },
  button: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "36px",
    background: "rgba(0,0,0,0.4)",
    color: "white",
    border: "none",
    cursor: "pointer",
    zIndex: 2,
    padding: "5px 15px",
    borderRadius: "50%"
  },
  prevButton: {
    left: "15px"
  },
  nextButton: {
    right: "15px"
  },
  shopButtonWrapper: {
    position: "absolute",
    bottom: "30px",
    left: "50%",
    transform: "translateX(-50%)"
  },
  shopButton: {
    padding: "12px 28px",
    fontSize: "18px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)"
  }
};

const Crousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const images = [image1, image2, image3];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleClick = () => {
    navigate('/products');
  };

  return (
    <div style={styles.container}>
      <button
        style={{ ...styles.button, ...styles.prevButton }}
        onClick={prevSlide}
      >
        &#10094;
      </button>

      <div style={styles.imageContainer}>
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          style={styles.image}
        />
       
      </div>

      <button
        style={{ ...styles.button, ...styles.nextButton }}
        onClick={nextSlide}
      >
        &#10095;
      </button>

      <div style={styles.shopButtonWrapper}>
        <button onClick={handleClick} style={styles.shopButton}>
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Crousel;
