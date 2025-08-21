import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import coffeeLogo from '../assets/coffee-logo.png';

function Navbar() {
  const navigate = useNavigate();


  const handleLoginAdmin = () => {
    navigate('/login-admin');
  };
  
  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleScrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleWishlistClick = () => {
    navigate('/wishlist');
  };

  const handleHistoryClick = () => {
    navigate('/history');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <nav className="navbar">
      {/* Logo and title */}
      <h1>
        <img src={coffeeLogo} className="coffee-logo" alt="Coffee Logo" />
        Coffee Point
      </h1>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li onClick={() => navigate('/')}>Home</li>
        <li onClick={() => handleScrollToSection('about')}>About</li>
        <li onClick={() => handleScrollToSection('products')}>Products</li>
        <li onClick={() => navigate('/gallery')}>Gallery</li>
        <li onClick={() => navigate('/book-table')}>Book Table</li>
        <li onClick={() => handleScrollToSection('contact')}>Contact</li>
      </ul>

      {/* Login Button */}
      <div className="icons">
        <i class="fa-solid fa-user-shield" onClick={handleLoginAdmin}></i>
        <i className="fa fa-user" onClick={handleLoginClick}></i>
        <i className="fa fa-heart" title="Wishlist" onClick={handleWishlistClick}></i>
        <i className="fa fa-clock" title="Order History" onClick={handleHistoryClick}></i>
        <i className="fa fa-shopping-cart" title="View Cart" onClick={handleCartClick}></i>
      </div>
    </nav>
  );
}

export default Navbar;
