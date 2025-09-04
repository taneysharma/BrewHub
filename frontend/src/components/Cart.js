import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Cart.css' ;

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'https://brewhub-tx1e.onrender.com';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${API_BASE}/cart`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        alert('Error fetching cart items. Please try again later.');
      }
    };
    fetchCartItems();
  }, []);

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE}/payment`, { cartItems }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setPaymentSuccess(true);
      setCartItems([]);
      setTimeout(() => {
        navigate('/user-dashboard'); // Redirect to user dashboard after payment
      }, 2000);
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Error processing payment. Please try again later.');
    }
  };

  const handleQuantityChange = (productId, delta) => {
    setCartItems(cartItems.map(item => {
      if (item._id === productId) {
        const newQuantity = item.quantity + delta;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    }));
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
  };

  return (
    <div>
      <h1>Cart</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item._id}>
              <td>
                <img
                  src={`${API_BASE}/uploads/${item.photo}`}
                  alt={item.coffeeName}
                  className="product-image"
                />
              </td>
              <td>{item.coffeeName}</td>
              <td>${item.rate}</td>
              <td>
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item._id, -1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item._id, 1)}
                >
                  +
                </button>
              </td>
              <td>${(item.rate * item.quantity).toFixed(2)}</td>
              <td>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {cartItems.length > 0 && (
        <button className="payment-btn" onClick={handlePayment}>
          Proceed to Payment
        </button>
      )}
      {paymentSuccess && <p>Payment successful! Redirecting to dashboard...</p>}
    </div>
  );
}

export default Cart;
