import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaSignOutAlt, FaSearch } from "react-icons/fa";
import "./UserDashboard.css";
import BookTable from "./BookTable"; // Import the BookTable component

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'https://brewhub-tx1e.onrender.com';

function UserDashboard() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [showWishlist, setShowWishlist] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]); // State to manage order history
  const [showBookTable, setShowBookTable] = useState(false); 
  const [showBookings, setShowBookings] = useState(false); // State to manage bookings visibility
  const [bookings, setBookings] = useState([]); // State to manage bookings
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]); // State to manage categories

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const productsResponse = await axios.get(`${API_BASE}/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(productsResponse.data);
        setFilteredProducts(productsResponse.data);

        const wishlistResponse = await axios.get(`${API_BASE}/wishlist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const wishlistData = wishlistResponse.data;
        setWishlist(wishlistData.map((item) => item._id));
        setWishlistProducts(wishlistData);

        const cartResponse = await axios.get(`${API_BASE}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const cartData = cartResponse.data;
        setCart(cartData.map((item) => item._id));
        setCartCount(cartData.length);

        const orderHistoryResponse = await axios.get(`${API_BASE}/orders1`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrderHistory(orderHistoryResponse.data);

        const categoriesResponse = await axios.get(`${API_BASE}/categories`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error fetching data. Please try again later.");
      }
    };
    fetchData();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE}/table-bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(response.data);
      setShowBookings(true);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      alert("Error fetching bookings. Please try again later.");
    }
  };

  const goToProducts = () => {
    setShowWishlist(false);
    setShowBookings(false);
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleLike = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (wishlist.includes(productId)) {
        await axios.delete(`${API_BASE}/wishlist/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWishlist(wishlist.filter((id) => id !== productId));
        setWishlistProducts(wishlistProducts.filter((product) => product._id !== productId));
      } else {
        await axios.post(
          `${API_BASE}/wishlist`,
          { productId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const wishlistResponse = await axios.get(`${API_BASE}/wishlist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const wishlistData = wishlistResponse.data;
        setWishlist(wishlistData.map((item) => item._id));
        setWishlistProducts(wishlistData);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      alert("Error updating wishlist. Please try again later.");
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (cart.includes(productId)) {
        await axios.delete(`${API_BASE}/cart/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCart(cart.filter((id) => id !== productId));
        setCartCount(cartCount - 1);
      } else {
        await axios.post(
          `${API_BASE}/cart`,
          { productId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCart([...cart, productId]);
        setCartCount(cartCount + 1);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      alert("Error updating cart. Please try again later.");
    }
  };

  const goToCart = () => {
    navigate("/cart");
  };

  const goToHistory = () => {
    navigate("/history");
  };

  const toggleWishlist = () => {
    setShowWishlist(!showWishlist);
    setShowBookings(false);
  };

  const handleBookTableClick = () => {
    setShowBookTable(true);
    setShowBookings(false);
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
    <div className="side-nav1">
      <h3>MENU</h3>
      <div className="button-container1">
        <button onClick={goToProducts}>Products</button>
        <button onClick={goToCart}>Go to Cart ({cartCount})</button>
        <button onClick={goToHistory}>Order History</button>
        <button onClick={toggleWishlist}>{showWishlist ? "Hide Wishlist" : "Show Wishlist"}</button>
        <button onClick={handleBookTableClick}>Book Table</button>
        <button onClick={fetchBookings}>My Bookings</button>
      </div>
      <button onClick={handleLogout} className="logout-button1">
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );

  return (
    <div className="user-dashboard-container1">
      {renderSideNav()}
      <div className="main-content1">
        <h1>User Dashboard</h1>

        {/* Conditionally render BookTable */}
        {showBookTable ? (
          <BookTable />
        ) : showWishlist ? (
          <div>
            <h2>Wishlist</h2>
            <div className="product-list1">
              {wishlistProducts.length === 0 ? (
                <p>Your wishlist is empty.</p>
              ) : (
                wishlistProducts.map((product) => (
                  <div className="product-card1" key={product._id}>
                    <img
                      src={`${API_BASE}/uploads/${product.photo}`}
                      alt={product.coffeeName}
                    />
                    <h3>{product.coffeeName}</h3>
                    <p>${product.rate}</p>
                    {product.category && <h4>Category: {product.category.name}</h4>}
                    <div className="product-actions1">
                      <button onClick={() => handleAddToCart(product._id)}>
                        {cart.includes(product._id) ? "Remove from Cart" : "Add to Cart"}
                      </button>
                      <button onClick={() => handleLike(product._id)}>Remove from Wishlist</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : showBookings ? (
          <div className="my-bookings-container">
            <h2 className="my-bookings-title">My Bookings</h2>
            <table className="my-bookings-table">
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
                    <tr key={booking._id} className="my-bookings-row">
                      <td>{booking.user.name}</td>
                      <td>{booking.user.email}</td>
                      <td>{new Date(booking.date).toLocaleDateString()}</td>
                      <td>{booking.time}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="my-bookings-empty">
                    <td colSpan="4">No bookings found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <div className="search-container1">
              <input
                type="text"
                placeholder="Search for a product..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-bar1"
              />
              <FaSearch className="search-icon1" />
            </div>

            <h2>PRODUCTS</h2>
            <div className="filter-buttons1">
  <button onClick={() => filterByCategory('All')}>All</button>
  {categories.map((category) => (
    <button key={category._id} onClick={() => filterByCategory(category.name)}>
      {category.name}
    </button>
  ))}
</div>

<div className="product-ig1">
  {filteredProducts.length > 0 ? (
    filteredProducts.map((product) => (
      <div className="product-card1" key={product._id}>
        <img
          src={`${API_BASE}/uploads/${product.photo}`}
          alt={product.coffeeName}
        />
        <h3>{product.coffeeName}</h3>
        {product.category && <h4>Category: {product.category.name}</h4>}
        <p>${product.rate}</p>
        <div className="product-actions1">
          <button onClick={() => handleAddToCart(product._id)}>
            {cart.includes(product._id) ? "Remove from Cart" : "Add to Cart"}
          </button>
          <span onClick={() => handleLike(product._id)} className="heart-icon1">
            {wishlist.includes(product._id) ? (
              <FaHeart style={{ color: "red" }} />
            ) : (
              <FaRegHeart />
            )}
          </span>
        </div>
      </div>
    ))
  ) : (
    <p className="not-found1">No product found</p>
  )}
  </div>
  
  </div>
)}

</div>
    </div>
  );
}

export default UserDashboard;