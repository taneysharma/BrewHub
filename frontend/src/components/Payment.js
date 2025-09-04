import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Payment.css';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'https://brewhub-tx1e.onrender.com';

const Payment = () => {
  const [orders, setOrders] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_BASE}/orders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        alert('Error fetching orders. Please try again later.');
      }
    };
    fetchOrders();
  }, []);

  const handlePaymentSubmit = () => {
    alert(`Payment method selected: ${paymentMethod}`);
    // Add payment API logic here.
  };

  return (
    <div className="payment-container">
      <h1>Payment</h1>
      <div className="payment-layout">
        {/* Order Summary Section */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="order-list">
            {orders.map((order) => (
              <div className="order-item" key={order._id}>
                <img
                  src={order.image ? `${API_BASE}/uploads/${order.image}` : 'default-image-url'} // Replace 'default-image-url' with a placeholder if needed
                  alt={order.productName}
                  className="order-item-image"
                />
                <div>
                  <h3>{order.productName}</h3>
                  <p>Price: ₹{order.price}</p>
                  <p>Quantity: {order.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="total-amount">
            Total: ₹
            {orders.reduce((total, order) => total + order.price * order.quantity, 0)}
          </div>
        </div>

        {/* Payment Section */}
        <div className="payment-section">
          <h2>Payment Information</h2>
          <label htmlFor="payment-method">Payment Method</label>
          <select
            id="payment-method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="UPI">UPI</option>
            <option value="Net Banking">Net Banking</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
          <p>
            {paymentMethod === 'Cash on Delivery'
              ? 'You have selected Cash on Delivery (COD). Please be ready with the exact cash on delivery.'
              : `You have selected ${paymentMethod}.`}
          </p>
          <button onClick={handlePaymentSubmit} className="payment-button">
            Complete Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
