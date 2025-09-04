import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import img1 from '../assets/Signup.jpg';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'https://brewhub-tx1e.onrender.com';

function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE}/login-admin`, { email, password });
      if (response.data.role === 'admin') {
        localStorage.setItem('token', response.data.token);
        navigate('/admin-dashboard');
      } else {
        alert('You are not authorized to access this page.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Failed to log in. Please check your credentials and try again.');
    }
  };

  return (
    <div className="login-container">
      <img src={img1} alt="Background" className="background-img" />
      <div className="login-box">
        <h4>ADMIN LOGIN</h4>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginAdmin;