import { IoHome } from "react-icons/io5";
import {
  FaTachometerAlt,
  FaPhoneAlt,
  FaInstagram,
  FaFacebook,
  FaSignOutAlt,
} from "react-icons/fa";
import TestimonialForm from "./TestimonialForm";
import TestimonialList from "./TestimonialList";
import { Link } from "react-router-dom";

const User = () => {
  return (
    <div className="user-page">
      <div className="sidebar">
        <h2 className="sidebar-title">Category</h2>
        <ul className="sidebar-nav">
          <li>
            <Link to="/admin/check">
              <FaTachometerAlt className="icon" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <FaPhoneAlt className="icon" />
              <span>Contact Us</span>
            </Link>
          </li>
          <li>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="icon" />
              <span>Instagram</span>
            </a>
          </li>
          <li>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="icon" />
              <span>Facebook</span>
            </a>
          </li>
          <li>
            <Link to="/login">
              <FaSignOutAlt className="icon" />
              <span>Log Out</span>
            </Link>
          </li>
          <li>
            <Link to="/home">
              <IoHome className="icon" />
              <span>Home</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="testimonial-content">
        <center>
          <TestimonialForm />
          <TestimonialList />
        </center>
      </div>

      {/* Internal CSS */}
      <style jsx>{`
        .user-page {
          display: flex;
        }

        .sidebar {
          width: 250px;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          background-color:#183B4E;
          color: white;
          padding-top: 20px;
          font-family: Arial, sans-serif;
          box-shadow: 2px 0 5px hsla(240, 4.80%, 4.10%, 0.80);
        }

        .sidebar-title {
          text-align: center;
          font-size: 1.5rem;
          margin-bottom: 20px;
          color: #fff;
        }

        .sidebar-nav {
          list-style: none;
          padding: 0;
        }

        .sidebar-nav li {
          margin: 20px 0;
        }

        .sidebar-nav li a {
          display: flex;
          align-items: center;
          color: #fff;
          text-decoration: none;
          font-size: 1.1rem;
        }

        .sidebar-nav li a:hover {
          color: #007bff;
        }

        .sidebar-nav .icon {
          margin-right: 10px;
        }

        .testimonial-content {
          margin-left: 270px; /* To provide space for sidebar */
          padding: 20px;
          width: 100%;
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 200px;
            font-size: 1rem;
          }

          .testimonial-content {
            margin-left: 220px;
          }
        }

        @media (max-width: 480px) {
          .sidebar {
            width: 100%;
            height: auto;
          }
          .testimonial-content {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default User;
