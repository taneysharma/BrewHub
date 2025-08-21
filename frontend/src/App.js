import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import BookTable from './components/BookTable';
import Home from './components/Home' ;
import Gallery from './components/gallery';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import LoginAdmin from './components/LoginAdmin';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Cart from './components/Cart';
import History from './components/History';
import Payment from './components/Payment' ;
import Wishlist from './components/Wishlist';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/gallery" element={<Gallery />} /> {/* Gallery Route */}
          <Route path="/book-table" element={<BookTable />} /> {/* Add the Book Table route */}
          <Route path="/login" element={<Login />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/history" element={<History />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/wishlist" element={<Wishlist />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
