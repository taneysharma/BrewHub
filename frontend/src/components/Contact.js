import React from 'react';
import './Contact.css';
import { FaPhone, FaClock, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactUs = () => {
  return (
    
    <div id="contact" className="contact-us">
      <h2 className="contact-title">Contact Us</h2>
      <div className='contact-b'>
      <div className="contact-box">
        <div className="contact-card">
          <FaPhone className="contact-icon" />
          <h3>Contact</h3>
          <p>+111-222-333</p>
          <p>+123-456-789</p>
        </div>
        <div className="contact-card">
          <FaClock className="contact-icon" />
          <h3>Opening Hours</h3>
          <p>Mon - Fri: 8am - 6pm</p>
          <p>Sat - Sun: 10am - 4pm</p>
        </div>
        <div className="contact-card">
          <FaEnvelope className="contact-icon" />
          <h3>Email</h3>
          <p>Abc@Gmail.Com</p>
          <p>Xyz@Gmail.Com</p>
        </div>
        <div className="contact-card">
          <FaMapMarkerAlt className="contact-icon" />
          <h3>Address</h3>
          <p>India , Haryana</p>
        </div>
      </div></div>
    </div>
  );
};

export default ContactUs;
