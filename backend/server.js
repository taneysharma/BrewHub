require('dotenv').config();

const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Admin = require('./models/Admin'); // Import the Admin model
const Product = require('./models/Product');
const Category = require('./models/Category'); // Import the Category model
const Wishlist = require('./models/Wishlist');
const Cart = require('./models/Cart');
const Payment = require('./models/Payment');
const TableBooking = require('./models/tableBook'); // Import the TableBooking model

const app = express();
const upload = multer({ dest: 'public/uploads/' });
const jwtSecret = 'your_jwt_secret';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send('Access denied. No token provided.');

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).send('Invalid or expired token');
  }
};

// Add Category Route
app.post('/categories', authenticateToken, async (req, res) => {
  const { name } = req.body;

  const newCategory = new Category({ name });

  try {
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).send('Error adding category: ' + error.message);
  }
});

// Fetch Categories Route
app.get('/categories', authenticateToken, async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).send('Error fetching categories: ' + error.message);
  }
});

// Add Product Route
app.post('/products', authenticateToken, upload.single('photo'), async (req, res) => {
  console.log(req.body)

  const { coffeeName, rate, category } = req.body;
  const photo = req.file ? req.file.filename : null;
  const adminId = req.user.userId;

  const newProduct = new Product({
    coffeeName,
    rate,
    photo,
    category: category, // Use categoryId
    admin: adminId,
  });
  console.log(newProduct);

  try {
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(500).send('Error adding product: ' + error.message);
  }
});

// Update Product Route
app.put('/products/:id', authenticateToken, upload.single('photo'), async (req, res) => {
  const { coffeeName, rate, categoryId } = req.body;
  const photo = req.file ? req.file.filename : req.body.photo;
  const adminId = req.user.userId;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { coffeeName, rate, photo, category: categoryId, admin: adminId },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).send('Error updating product: ' + error.message);
  }
});

// Fetch Products Route
app.get('/products', authenticateToken, async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'name');
    res.json(products);
  } catch (error) {
    res.status(500).send('Error fetching products: ' + error.message);
  }
});



// Fetch Users Route
app.get('/users', authenticateToken, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send('Error fetching users: ' + error.message);
  }
});


// Signup Route for Users
app.post('/signup', async (req, res) => {
  const { name, email, password, authorize } = req.body;

  if (!password) {
    return res.status(400).send('Password is required');
  }

  if (authorize === undefined) {
    return res.status(400).send('You must agree to the terms and conditions');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: 'user', // Default to 'user'
      authorize,
    });

    await newUser.save();
    res.status(201).send('Signup successful');
  } catch (error) {
    res.status(500).send('Error saving user: ' + error.message);
  }
});



// Signup Route for Admins
app.post('/signup-admin', async (req, res) => {
  const { name, email, password, mobile } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      mobile,
      role: 'admin',
    });

    await newAdmin.save();
    res.send('Admin signup successful');
  } catch (error) {
    res.status(500).send('Error saving admin: ' + error.message);
  }
});


// Login Route for Users
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, jwtSecret, { expiresIn: '1h' });
    res.json({ token, role: user.role, userId: user._id });
  } catch (error) {
    res.status(500).send('Error logging in: ' + error.message);
  }
});

// Login Route for Admins
app.post('/login-admin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  try {
    // Find admin user
    const admin = await Admin.findOne({ email, role: 'admin' });
    if (!admin) {
      return res.status(401).send('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign({ userId: admin._id, role: admin.role }, jwtSecret, {
      expiresIn: '1h',
    });

    res.json({ token, role: admin.role, userId: admin._id });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Error logging in: ' + error.message);
  }
});


// Edit Product Route
app.put('/products/:id', authenticateToken, upload.single('photo'), async (req, res) => {
  try {
    const { id } = req.params;
    const { coffeeName, rate } = req.body;
    const updateData = { coffeeName, rate };

    if (req.file) {
      updateData.photo = req.file.filename;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
});

// Delete Product Route
app.delete('/products/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
});

// Add Product to Wishlist
app.post('/wishlist', authenticateToken, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.userId;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send('Product not found');
    }

    const newWishlistItem = new Wishlist({
      user: userId,
      product: productId,
    });

    await newWishlistItem.save();
    res.send('Product added to wishlist');
  } catch (error) {
    res.status(500).send('Error adding to wishlist: ' + error.message);
  }
});

// Fetch Wishlist
app.get('/wishlist', authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const wishlistItems = await Wishlist.find({ user: userId }).populate('product');
    res.json(wishlistItems.map(item => item.product));
  } catch (error) {
    res.status(500).send('Error fetching wishlist: ' + error.message);
  }
});

app.delete('/wishlist/:productId', authenticateToken, async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.userId;

  try {
    const result = await Wishlist.deleteOne({ product: productId, user: userId });
    console.log("wishlist", result);
    res.send('Product removed from wishlist');
  } catch (error) {
    res.status(500).send('Error removing from wishlist: ' + error.message);
  }
});

// Add Product to Cart
app.post('/cart', authenticateToken, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.userId;

  try {
    const newCartItem = new Cart({
      user: userId,
      product: productId,
    });

    await newCartItem.save();
    res.send('Product added to cart');
  } catch (error) {
    res.status(500).send('Error adding to cart: ' + error.message);
  }
});

app.delete('/cart/:productId', authenticateToken, async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.userId;
  try {
    const result = await Cart.deleteOne({ product: productId, user: userId });
    console.log(result);
    res.send('Product removed from cart');
  } catch (error) {
    res.status(500).send('Error removing from cart: ' + error.message);
  }
});

// Fetch Cart
app.get('/cart', authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const cartItems = await Cart.find({ user: userId }).populate('product');
    res.json(cartItems.map(item => item.product));
  } catch (error) {
    res.status(500).send('Error fetching cart items: ' + error.message);
  }
});


// Get Orders Route for Admin
app.get('/orders', authenticateToken, async (req, res) => {
  try {
    const orders = await Payment.find().populate('userId', 'name');
    res.status(200).json(orders.map(order => ({
      _id: order._id,
      productName: order.productName,
      quantity: order.quantity,
      price: order.price,
      userName: order.userId.name // Include the name of the person who ordered
    })));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get Orders Route for Logged-In User
app.get('/orders1', authenticateToken, async (req, res) => {
  try {
    const orders = await Payment.find({ userId: req.user.userId }).populate('userId', 'name');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});



// Checkout (Payment)
app.post('/payment', authenticateToken, async (req, res) => {
  const { cartItems } = req.body;
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const orders = cartItems.map(item => ({
      userId,
      userName: user.name,
      productName: item.coffeeName,
      price: item.rate,
      quantity: item.quantity,
    }));

    await Payment.insertMany(orders);
    await Cart.deleteMany({ user: userId });

    res.send('Payment successful and order placed');
  } catch (error) {
    res.status(500).send('Error processing payment: ' + error.message);
  }
});

// Add Category Route
app.post('/categories', authenticateToken, async (req, res) => {
  const { name } = req.body;

  const newCategory = new Category({ name });

  try {
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add category' });
  }
});

app.get('/categories', authenticateToken, async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Add Table Booking Route
app.post('/table-bookings', authenticateToken, async (req, res) => {
  const { date, time, numberOfPeople } = req.body;
  const userId = req.user.userId;
  console.log(userId)

  const newTableBooking = new TableBooking({
    user: userId,
    date,
    time,
    numberOfPeople,
  });

  try {
    await newTableBooking.save();

    res.status(201).json(newTableBooking);
  } catch (error) {
    console.log(error)
    res.status(500).send('Error booking table: ' + error.message);
  }
});

// Fetch Table Bookings Route
app.get('/table-bookings', authenticateToken, async (req, res) => {
  try {
    const tableBookings = await TableBooking.find({ user: req.user.userId }).populate("user");
    res.json(tableBookings);
  } catch (error) {
    res.status(500).send('Error fetching table bookings: ' + error.message);
  }
});

// Update Table Booking Route
app.put('/table-bookings/:id', authenticateToken, async (req, res) => {
  const { date, time, numberOfPeople } = req.body;

  try {
    const updatedTableBooking = await TableBooking.findByIdAndUpdate(
      req.params.id,
      { date, time, numberOfPeople },
      { new: true }
    );
    res.json(updatedTableBooking);
  } catch (error) {
    res.status(500).send('Error updating table booking: ' + error.message);
  }
});

// Delete Table Booking Route
app.delete('/table-bookings/:id', authenticateToken, async (req, res) => {
  try {
    await TableBooking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Table booking deleted successfully' });
  } catch (error) {
    res.status(500).send('Error deleting table booking: ' + error.message);
  }
});


// Fetch All Table Bookings Route for Admin
app.get('/all-table-bookings', authenticateToken, async (req, res) => {
  try {
    const tableBookings = await TableBooking.find().populate('user', 'name email');
    res.json(tableBookings);
  } catch (error) {
    res.status(500).send('Error fetching table bookings: ' + error.message);
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});