import React from 'react';
import './Footer.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-section coffee-point">
          <h2>Coffee Point</h2>
          <p>
            Our Coffee Is Always The Way You Like. We Don't Make Your Coffee.
            We Make Your Day. We're Not Just A Cup Of Coffee. We're A Lifestyle.
          </p>
        </div>

        <div className="footer-section quick-links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Menu</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Reservation</a></li>
          </ul>
        </div>

        <div className="footer-section contact-info">
          <h2>Contact Info</h2>
          <p><FaPhone /> +111-222-333</p>
          <p><FaPhone /> +123-456-789</p>
          <p><FaEnvelope /> abc@gmail.com</p>
          <p><FaEnvelope /> xyz@gmail.com</p>
          <p><FaMapMarkerAlt /> India , Haryana</p>

          <div className="social-icons">
            <a href="https://facebook.com"><FaFacebook /></a>
            <a href="https://twitter.com"><FaTwitter /></a>
            <a href="https://instagram.com"><FaInstagram /></a>
            <a href="https://linkedin.com"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        Designed By <a href="#">CoffeeTop</a> | All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
