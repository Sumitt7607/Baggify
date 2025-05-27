import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/', { name, email, password })
      .then(result => {
        console.log(result);
        navigate('/login');
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <div className="signup-wrapper">
        <div className="left-panel">
          <h1 className="signup-heading">Sign Up</h1>
          <p className="signup-subheading">Secure Your Communications with EncryptMail</p>
          <form onSubmit={handleSubmit} className="signup-form">
            <label>Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Register</button>
            <p className="login-link">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </form>
        </div>

        <div className="right-panel">
          <img src="/SIgnUp.jpg" alt="Sign Up Visual" className="signup-image" />
        </div>
      </div>

      <Footer />

      <style>{`
        .signup-wrapper {
          display: flex;
          height: 100vh;
          overflow: hidden;
        }

        .left-panel {
          flex: 1;
          padding: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #fff;
        }

        .signup-heading {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .signup-subheading {
          font-size: 1.1rem;
          color: #666;
          margin-bottom: 30px;
        }

        .signup-form {
          display: flex;
          flex-direction: column;
        }

        .signup-form label {
          margin: 10px 0 5px;
          font-weight: 600;
        }

        .signup-form input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 1rem;
        }

        .signup-form button {
          margin-top: 20px;
          padding: 10px;
          background-color:rgb(0, 119, 255);
          color: #fff;
          font-size: 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .signup-form button:hover {
          background-color: #0056b3;
        }

        .login-link {
          margin-top: 15px;
          font-size: 0.95rem;
        }

        .login-link a {
          color: #007bff;
          text-decoration: none;
        }

        .login-link a:hover {
          text-decoration: underline;
        }

        .right-panel {
          flex: 1;
          position: relative;
          overflow: hidden;
        }

        .signup-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 768px) {
          .signup-wrapper {
            flex-direction: column;
          }
          .right-panel {
            height: 300px;
          }
        }
      `}</style>
    </>
  );
}

export default SignUp;









































































































// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Footer from './Footer';

// function SignUp() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post('http://localhost:3001/', { name, email, password })
//       .then(result => {
//         console.log(result);
//         navigate('/home');
//       })
//       .catch(err => console.log(err));
//   };

//   return (
//     <>
//     <div className="signup-page">
//       <div className="signup-container">
//         <h2 className="signup-title">Create Account here</h2>
//         <form onSubmit={handleSubmit} className="signup-form">
//           <div className="signup-group">
//             <label htmlFor="name" className="signup-label">Name</label>
//             <input
//               type="text"
//               id="username"
//               name="name"
//               className="signup-input"
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="signup-group">
//             <label htmlFor="email" className="signup-label">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="signup-input"
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="signup-group">
//             <label htmlFor="password" className="signup-label">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               className="signup-input"
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="signup-btn">Register</button>
//         </form>
//         <p className="signup-link">
//           Already have an account? <Link to="/login" className="signup-link-text">Login here</Link>
//         </p>
//       </div>
     
//     </div>
//      <Footer></Footer>
//     </>
//   );
// }

// export default SignUp;
