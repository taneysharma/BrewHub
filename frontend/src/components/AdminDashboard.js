import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSignOutAlt, FaSearch } from 'react-icons/fa';
import './AdminDashboard.css';
import AdminSignup from './AdminSignup'; // Import the new AdminSignup component

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'https://brewhub-tx1e.onrender.com';

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]); // State to manage order history
  const [formData, setFormData] = useState({
    coffeeName: '',
    rate: '',
    photo: null,
    category: '', // Add category to formData
  });
  const [categories, setCategories] = useState([]); // State to manage categories
  const [categoryName, setCategoryName] = useState(''); // State to manage category name
  const [currentSection, setCurrentSection] = useState('products');
  const [editProductId, setEditProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookings, setBookings] = useState([]); // State to manage bookings

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      alert('Session expired. Please log in again.');
      window.location.href = '/login-admin';
      return;
    }

    const fetchData = async () => {
      try {
        const productsResponse = await axios.get(`${API_BASE}/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(productsResponse.data);
        setFilteredProducts(productsResponse.data);

        const usersResponse = await axios.get(`${API_BASE}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersResponse.data);

        const categoriesResponse = await axios.get(`${API_BASE}/categories`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleEdit = (product) => {
    setEditProductId(product._id);
    setFormData({
      coffeeName: product.coffeeName,
      rate: product.rate,
      photo: null,
      category: product.category?._id || '', // Set category in formData
    });
    setCurrentSection('editProduct');
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${API_BASE}/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(products.filter(product => product._id !== productId));
      setFilteredProducts(filteredProducts.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('coffeeName', formData.coffeeName);
    formDataToSend.append('rate', formData.rate);
    formDataToSend.append('category', formData.category); // Include category in formData
    if (formData.photo) {
      formDataToSend.append('photo', formData.photo);
    }

    try {
      const response = await axios.post(`${API_BASE}/products`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Product added successfully');
      setProducts([...products, response.data]);
      setFilteredProducts([...products, response.data]);
      setFormData({ coffeeName: '', rate: '', photo: null, category: '' });
      setCurrentSection('products');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('coffeeName', formData.coffeeName);
    formDataToSend.append('rate', formData.rate);
    formDataToSend.append('category', formData.category); // Include category in formData
    if (formData.photo) {
      formDataToSend.append('photo', formData.photo);
    }

    try {
      const response = await axios.put(`${API_BASE}/products/${editProductId}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Product updated successfully');
      setProducts(products.map(product => product._id === editProductId ? response.data : product));
      setFilteredProducts(products.map(product => product._id === editProductId ? response.data : product));
      setFormData({ coffeeName: '', rate: '', photo: null, category: '' });
      setEditProductId(null);
      setCurrentSection('products');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${API_BASE}/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('User deleted successfully');
        setUsers(users.filter((user) => user._id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login-admin';
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.coffeeName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const fetchOrders = async () => {
    try {
      const orderHistoryResponse = await axios.get(`${API_BASE}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrderHistory(orderHistoryResponse.data);
      setCurrentSection('orderHistory');
    } catch (error) {
      console.error('Error fetching order history:', error);
      alert('Failed to fetch order history. Please try again.');
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${API_BASE}/all-table-bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data);
      console.log(response.data);
      setCurrentSection('userBookings');
    } catch (error) {
      console.error('Error fetching bookings:', error);
      alert('Failed to fetch bookings. Please try again.');
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE}/categories`, { name: categoryName }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Category added successfully');
      setCategories([...categories, response.data]); // Add new category to state
      setCategoryName('');
      setCurrentSection('products'); // Redirect to products section after adding category
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Failed to add category. Please try again.');
    }
  };

  const filterByCategory = (categoryName) => {
    if (categoryName === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category?.name === categoryName);
      setFilteredProducts(filtered);
    }
  };

  const renderSideNav = () => (
    <div className="side-nav">
      <h3>MENU</h3>
      <div className="button-container">
        <button onClick={() => setCurrentSection('addProduct')}>Add New Product</button>
        <button onClick={() => setCurrentSection('products')}>Products</button>
        <button onClick={() => setCurrentSection('users')}>Users</button>
        <button onClick={fetchOrders}>Order History</button>
        <button onClick={() => setCurrentSection('addAdmin')}>Add Admin</button>
        <button onClick={() => setCurrentSection('addCategory')}>Add Category</button>
        <button onClick={fetchBookings}>User Bookings</button>
      </div>
      <div className="logout-container">
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard-container">
      {renderSideNav()}
      <div className="main-content">
        <h1>Admin Dashboard</h1>
        {currentSection === 'users' && (
          <div>
            <h2>Users</h2>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button className="delete-button" onClick={() => handleDeleteUser(user._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {currentSection === 'addProduct' && (
          <form className="add-admin-form" onSubmit={handleSubmit}>
            <div>
              <label>Coffee Name:</label>
              <input
                type="text"
                name="coffeeName"
                value={formData.coffeeName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="number"
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Category:</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Image:</label>
              <input type="file" name="photo" onChange={handleFileChange} required />
            </div>
            <button type="submit">Add Product</button>
          </form>
        )}

        {currentSection === 'editProduct' && (
          <form className="add-admin-form" onSubmit={handleEditSubmit}>
            <div>
              <label>Coffee Name:</label>
              <input
                type="text"
                name="coffeeName"
                value={formData.coffeeName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="number"
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Category:</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Image:</label>
              <input type="file" name="photo" onChange={handleFileChange} />
            </div>
            <button type="submit">Update Product</button>
          </form>
        )}

        {currentSection === 'addAdmin' && (
          <AdminSignup />
        )}

        {currentSection === 'addCategory' && (
          <div className="add-category-container">
            <h2 className="add-category-title">Add Category</h2>
            <form className="add-category-form" onSubmit={handleCategorySubmit}>
              <div>
                <label>Category Name:</label>
                <input
                  type="text"
                  name="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Add Category</button>
            </form>
          </div>
        )}

        {currentSection === 'products' && (
          <div className="product-list">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search for a product..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-bar"
              />
              <FaSearch className="search-icon" />
            </div>

            <h2 className="pro">PRODUCTS</h2>
            <div className="filter-buttons">
              <button onClick={() => filterByCategory('All')}>All</button>
              {categories.map((category) => (
                <button key={category._id} onClick={() => filterByCategory(category.name)}>
                  {category.name}
                </button>
              ))}
            </div>

            <div className="product-ig">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div className="product-card" key={product._id}>
                  <img
                    src={`${API_BASE}/uploads/${product.photo}`}
                    alt={product.coffeeName}
                  />
                  <h3>{product.coffeeName}</h3>
                  {product.category && <h4>Category: {product.category.name}</h4>}
                  <p>${product.rate}</p>
                  <div className="product-actions">
                    <button className="edit-button" onClick={() => handleEdit(product)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(product._id)}>Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="not-found">No product found</p>
            )}
          </div>

          </div>
        )}

        {currentSection === 'orderHistory' && (
          <div className="order-history-container">
            <h2 className="order-history-title">Order History</h2>
            <table className="order-history-table">
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
                {orderHistory.length > 0 ? (
                  orderHistory.map((order) => (
                    <tr key={order._id} className="order-history-row">
                      <td>{order._id}</td>
                      <td>{order.productName}</td>
                      <td>{order.userName}</td> {/* Display the name of the person who ordered */}
                      <td>{order.quantity}</td>
                      <td>${order.price}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="order-history-empty">
                    <td colSpan="5">No order history found</td> {/* Update colspan to 5 */}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {currentSection === 'userBookings' && (
          <div className="user-bookings-container">
            <h2 className="user-bookings-title">User Bookings</h2>
            <table className="user-bookings-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking._id} className="user-bookings-row">
                      <td>{booking.user.name}</td>
                      <td>{booking.user.email}</td>
                      <td>{new Date(booking.date).toLocaleDateString()}</td>
                      <td>{booking.time}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="user-bookings-empty">
                    <td colSpan="4">No bookings found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;