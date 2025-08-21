import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import backg from '../assets/Signup.jpg';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    authorize: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/signup', formData);
      console.log('Signup response:', response.data); // Log the response data
      alert('Signup successful');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error signing up:', error.response.data);
        alert('Error signing up: ' + error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error signing up:', error.request);
        alert('Error signing up. No response from server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error signing up:', error.message);
        alert('Error signing up: ' + error.message);
      }
    }
  };

  return (
    <div className="signup-container">
      <img className="background-img" src={backg} alt="Signup Background" />
      <form onSubmit={handleSubmit} className="signup-box">
        <h2>SIGNUP</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="signup-box-input"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="signup-box-input"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="signup-box-input"
          />
        </div>
        {/* <div className="terms">
          <input
            type="checkbox"
            name="authorize"
            checked={formData.authorize}
            onChange={handleChange}
          />
          <span>I Agree With The Terms & Conditions</span>
        </div> */}
        <button type="submit" className="register-button">
          Signup
        </button>
        <p className="login-link">
          Already Have An Account?{' '}
          <span onClick={() => navigate('/login')} className="link">
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;