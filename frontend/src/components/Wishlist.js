import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Wishlist.css';

function Wishlist() {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlistAndCart = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch wishlist products
        const wishlistResponse = await axios.get('http://localhost:5000/wishlist', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setWishlistProducts(wishlistResponse.data);

        // Fetch cart data
        const cartResponse = await axios.get('http://localhost:5000/cart', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setCart(cartResponse.data.map(item => item._id));
        setCartCount(cartResponse.data.length);
      } catch (error) {
        console.error('Error fetching wishlist or cart:', error);
        alert('Error fetching data. Please try again later.');
      }
    };

    fetchWishlistAndCart();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (cart.includes(productId)) {
        await axios.delete(`http://localhost:5000/cart/${productId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setCart(cart.filter(id => id !== productId));
        setCartCount(cartCount - 1);
      } else {
        await axios.post('http://localhost:5000/cart', { productId }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setCart([...cart, productId]);
        setCartCount(cartCount + 1);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      alert('Error updating cart. Please try again later.');
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/wishlist/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setWishlistProducts(wishlistProducts.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      alert('Error removing from wishlist. Please try again later.');
    }
  };

  const goToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="wishlist-container">
      <button onClick={goToCart}>Go to Cart ({cartCount})</button>
      <h2>Wishlist</h2>
      <div className="wishlist-products">
        {wishlistProducts.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          wishlistProducts.map((product) => (
            <div className="product-card" key={product._id}>
              <img
                src={`http://localhost:5000/uploads/${product.photo}`}
                alt={product.coffeeName}
              />
              <h3>{product.coffeeName}</h3>
              <p>${product.rate}</p>
              <div className="wishlist-actions">
                <button onClick={() => handleAddToCart(product._id)}>
                  {cart.includes(product._id) ? 'Remove from Cart' : 'Add to Cart'}
                </button>
                <button onClick={() => handleRemoveFromWishlist(product._id)}>
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Wishlist;
