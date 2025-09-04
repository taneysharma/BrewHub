import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './History.css';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'https://brewhub-tx1e.onrender.com';

function History() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role'); // Get the role from local storage

        let endpoint = `${API_BASE}/orders1`;
        if (role === 'admin') {
          endpoint = `${API_BASE}/orders`;
        }

        const response = await axios.get(endpoint, {
          headers: {
            'Authorization': `Bearer ${token}`,
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

  return (
    <div>
      <h1>Order History</h1>
      <div className="order-list">
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Item Name</th>
              <th>Ordered By</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.productName}</td>
                <td>{order.userId.name}</td>
                <td>{order.quantity}</td>
                <td>${order.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default History;
