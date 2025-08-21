import React, { useState } from 'react';
import './BookTable.css'; // Include a separate CSS file for styling

const socialLinks = [
  { platform: 'facebook', url: 'https://facebook.com' },
  { platform: 'twitter', url: 'https://twitter.com' },
  { platform: 'instagram', url: 'https://instagram.com' },
  { platform: 'linkedin', url: 'https://linkedin.com' },
];

const BookTable = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    date: '',
    time: '',
    guests: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/table-bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Booking successful!');
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="book-table-container">
      {/* Left Section */}
      <div className="working-hours">
        <h2>Working Hours</h2>
        <p>
          <strong>Monday - Friday</strong>
          <br />
          8am - 6pm
        </p>
        <p>
          <strong>Saturday - Sunday</strong>
          <br />
          10am - 4pm
        </p>
        <h3>Restaurant Address</h3>
        <p>India, Haryana</p>
        <hr />
        <p>Call Us: 123-456-789</p>
        <div className="social-links1">
          <span>Follow Us:</span>
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-icon ${link.platform}`}
            >
              <i className={`fab fa-${link.platform}`}></i>
            </a>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="booking-form">
        <h2>Book Your Table</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="number"
              placeholder="Number"
              value={formData.number}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="time"
              name="time"
              className="time-input"
              value={formData.time}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="guests"
              placeholder="Guests"
              value={formData.guests}
              onChange={handleChange}
              required
            />
          </div>
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button type="submit" className="btn-book-now">
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookTable;
