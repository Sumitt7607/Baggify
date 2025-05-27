// Home.jsx
import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import NavBar from './NavBar';
import Crousel from './Crousel';
import Footer from './Footer';
import image1 from './assets/girl.png';
import img1 from './assets/Gucci-Logo.png';
import img2 from './assets/lv.png';
import img3 from './assets/parada.jpeg';
import img4 from './assets/channel.png';
import 'bootstrap/dist/css/bootstrap.css';

const Home = () => {
  const textRef = useRef(null);
  const videoRef = useRef(null);

  useGSAP(() => {
    gsap.from(textRef.current, {
      x: 100,
      opacity: 0,
      duration: 2,
      ease: 'power3.out',
      delay: 1,
    });
  }, []);
    const cardStyle = {
    display: 'inline-block',
    width: '22%',        // roughly 4 cards in 100% width with some margin
    marginRight: '2%',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxSizing: 'border-box',
    verticalAlign: 'top',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(error => {
            console.log('Autoplay failed:', error);
          });
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="home-wrapper">
      <NavBar />
      <Crousel />

      <center>
        <h1 style={{ color: '#000', paddingTop: '2rem' }}>Shop with us!</h1>
      </center>

      <div className="promo-section">
        <img src={image1} alt="Tan leather handbag" className="promo-img" />
        <div ref={textRef} style={{ maxWidth: '400px' }}>
          <h3 style={{ fontWeight: 'normal', fontSize: '1.5rem', color: '#A33638' }}>
            A timeless tan leather handbag—<br />
            where elegance meets everyday adventure.
          </h3>
        </div>
      </div>

      <center>
        <h1 style={{ color: '#000' }}>Discover More!</h1>
      </center>

      <div className="video-section">
        <video ref={videoRef} width="1200" height="700" muted controls className="promo-video">
          <source src="/DiscoverVideoNew.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <center className="NewLuanched" style={{ color: '#839138' }}>
        A RunAway Online Exclusive
        <p className="pAragrph">
          Cruise 2026 will unfold at the Baggify Archive in Florence with House codes inspiring the new collection.
          <p className="pAragrph">
            Stay tuned for the runway debut of a new handbag, available exclusively online following the show.
          </p>
        </p>
      </center>
 <center className='NewLuanched' style={{ color: '#6A4775' }}>
  Our Collaboration
  <div style={{ width: '100%', padding: '2rem', whiteSpace: 'nowrap' }}>
    <div   style={cardStyle}>
      <h3>Gucci</h3>
      <img
        src={img1}
        alt="Gucci"
        style={{ width: '100%', height: '150px', objectFit: 'contain' }}
      />
    </div>
    <div style={cardStyle}>
      <h3>Louis Vuitton</h3>
      <img
        src={img2}
        alt="Louis Vuitton"
        style={{ width: '100%', height: '150px', objectFit: 'contain' }}
      />
    </div>
    <div style={cardStyle}>
      <h3>Prada</h3>
      <img
        src={img3}
        alt="Prada"
        style={{ width: '100%', height: '150px', objectFit: 'contain' }}
      />
    </div>
    <div style={{ ...cardStyle, marginRight: 0 }}>
      <h3>Chanel</h3>
      <img
        src={img4}
        alt="Chanel"
        style={{ width: '100%', height: '150px', objectFit: 'contain' }}
      />
    </div>
  </div>
</center>

      <Footer />
    </div>
  );
};

export default Home;
































































































// import React, { useRef } from 'react';
// import { useGSAP } from '@gsap/react';
// import gsap from 'gsap';
// import { useNavigate } from 'react-router-dom';

// import Footer from './Footer';
// import NavBar from './NavBar';
// import Crousel from './Crousel';

// import image1 from './assets/girl.png';
// import 'bootstrap/dist/css/bootstrap.css';

// const Home = () => {
//   const textRef = useRef(null);
//   const navigate = useNavigate();

//   useGSAP(() => {
//     gsap.from(textRef.current, {
//       x: 100,
//       opacity: 0,
//       duration: 2,
//       ease: "power3.out",
//       delay: 1,
//     });
//   }, []);

//   const brands = [
//     { name: 'Gucci', logo: '/gucci.png' },
//     { name: 'LV', logo: '/lv.png' },
//     { name: 'Fossil', logo: '/fossil.png' },
//     { name: 'Prada', logo: '/prada.png' },
//   ];

//   return (
//     <>
//       <NavBar />
//       <Crousel />

//       <center>
//         <h1>Shop with us!</h1>
//       </center>

//       {/* Handbag Promo Section */}
//       <div
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           padding: '2rem',
//           flexWrap: 'wrap',
//         }}
//       >
//         <img
//           src={image1}
//           alt="Tan leather handbag"
//           style={{
//             width: '500px',
//             height: '600px',
//             marginRight: '2rem',
//             borderRadius: '8px',
//             boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
//           }}
//         />
//         <div ref={textRef} style={{ maxWidth: '400px' }}>
//           <h3 style={{ fontWeight: 'normal', fontSize: '1.5rem' }}>
//             A timeless tan leather handbag—<br />
//             where elegance meets everyday adventure.
//           </h3>
//         </div>
//       </div>

//       {/* Featured Heading */}
//       <center>
//         <h1>Featured</h1>
//       </center>

//       {/* Shop by Brand Section */}
//       <div className="container my-5">
//         <h2 className="text-center mb-4">Shop by Brand</h2>
//         <div className="row justify-content-center g-4">
//           {brands.map((brand) => (
//             <div className="col-6 col-sm-4 col-md-3" key={brand.name}>
//               <div
//                 className="card text-center shadow-sm p-3 animate-card"
//                 style={{ cursor: 'pointer' }}
//                 onClick={() => navigate(`/products?brand=${brand.name}`)}
//               >
//                 <img
//                   src={brand.logo}
//                   alt={brand.name}
//                   style={{ height: '80px', objectFit: 'contain', marginBottom: '1rem' }}
//                 />
//                 <h5 className="mb-0">{brand.name}</h5>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <Footer />

//       {/* Brand Card Hover Animation */}
//       <style>{`
//         .animate-card {
//           transition: transform 0.3s ease;
//         }

//         .animate-card:hover {
//           transform: scale(1.05);
//         }
//       `}</style>
//     </>
//   );
// };

// export default Home;

































