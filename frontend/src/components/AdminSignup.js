import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import backg from '../assets/Signup.jpg';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'https://brewhub-tx1e.onrender.com';

function AdminSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/signup-admin`, {
        ...formData,
        role: 'admin',
      });
      alert('Admin signup successful');
      navigate('/admin-dashboard');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Failed to sign up. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <img src={backg} alt="Background" className="background-img" />
      <div className="signup-box">
        <h2>Admin Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Mobile Number:</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>
          <button className='sgnp' type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default AdminSignup;