
import { FaTruckFront } from "react-icons/fa6";
import { FaUser, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { FaSearch } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useState } from 'react';
import {useGSAP} from '@gsap/react'
import gsap from 'gsap';
import { Link, useNavigate } from 'react-router-dom';
import my from './assets/myLogo.jpg'

function NavBar() {
    useGSAP(()=>{
  gsap.to('#id1',{
    x:400,
    duration:4,
    delay:1,
    repeat:-1,
    yoyo:true,
  })
  gsap.from('#id2',{
    y:100,
    duration:2,
    delay:1,
  })
  })
    const navigate=useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const handleLogout = () => {
        setIsLoggedIn(false); // Update state
        navigate('/login'); // Redirect to login page
    };
    
  return (
    <div>
      <div className="black-strip">
     <p id='id1'  ><FaTruckFront /> FREE shiping when shopping upto $1000       </p> 

  

     
    <nav className="navbar">
 
<div className="search-button-container">
  <img
    src={my} // <- replace with your image path
    alt="Search Promo"
    style={{ height: '60px',backgroundColor:'#fff ',  borderRadius: '8px' }}
  />
</div>


   <div id='id2' className="navbar-logo" >
      {/* <img src="/logo192.png" alt="Company Logo" /> */}
   BAGGIFY
    
</div>

    <div className="navbar-icons">
    <Link to="/user">
  <FaUser className="icon" title="User" />
</Link>
     <Link to={'/wishlist'}>
      <FaHeart className="icon" title="Wishlist" />
</Link>


      <Link to={'/cart'}>
      <FaShoppingCart className="icon" title="Cart" />
      </Link>
    
      <div>
        {isLoggedIn ? (
         <FiLogOut onClick={handleLogout} className='icon' title='Logout' />

        ) : (
            <p>You are logged out!</p>
        )}
      
     
    </div>
   
   
 
  </div>


  </nav>
 
  </div>
    </div>
  )
}

export default NavBar
