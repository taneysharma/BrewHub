import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import img1 from '../assets/Signup.jpg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      const userRole = response.data.role;
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);

      if (userRole === 'user') {
        navigate('/user-dashboard');
      } else {
        alert('Invalid details! Please log in with correct account.');
      }
    } catch (error) {
      alert('Error logging in: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="login-container">
      <img className="background-img" src={img1} alt="Signup Background" />
      <div className="login-box">
        <h4>LOGIN</h4>
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
          <h3>
            Don't have an account? <Link to="/signup" className="link">Create New</Link>
          </h3>
        </form>
      </div>
    </div>
  );
}

export default Login;