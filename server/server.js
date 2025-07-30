require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const usermodel = require('./models/user');
const PostModel = require('./models/product');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const testimonialSchema = require('./models/Testimonials');
const ContactModel = require('./models/Contactus');
const nodemailer = require('nodemailer'); // Import nodemailer
const OrderModel = require('./models/Order_temp');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);






const multer = require('multer');
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
const SECRET_KEY = 'your_jwt_secret_key';

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce');
// require('dotenv').config();
// const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail', // or another email provider
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

const allowedOrigins = ["https://baggify-h8a6.vercel.app/"];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));


// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Product routes
app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    console.log('REQ BODY:', req.body);
    console.log('REQ FILE:', req.file);

    const { name, description, price, discount, sale } = req.body;
    const image = req.file?.path;

    const product = new PostModel({ name, description, price, discount, sale, image });
    await product.save();
    res.json(product);
  } catch (err) {
    console.error('Error in POST /api/products:', err);
    res.status(500).json({ error: err.message });
  }
});

// Route for submitting contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save the contact form data to MongoDB
    const newContact = new ContactModel({ name, email, message });
    await newContact.save();

    // Setup the email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: process.env.ADMIN_EMAIL,  // Receiver address (admin email)
      subject: `New Contact Message from ${name}`, // Subject line
      text: `You have a new message from ${name} (${email}):\n\n${message}`, // Plain text body
      html: `<p>You have a new message from <strong>${name}</strong> (<a href="mailto:${email}">${email}</a>):</p><p>${message}</p>`, // HTML body
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Respond to frontend after successful submission
    res.json({ success: true, message: 'Message received and email sent!' });
  } catch (err) {
    console.error('Error sending contact form:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await PostModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product
app.put('/api/products/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, discount, sale } = req.body;
    const image = req.file ? req.file.path : undefined;

    const updateData = { name, description, price, discount, sale };
    if (image) updateData.image = image;

    const updatedProduct = await PostModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete product
app.delete('/api/products/:id', async (req, res) => {
  try {
    await PostModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Testimonial routes
app.post('/api/testimonials', async (req, res) => {
  try {
    const { name, description, rating } = req.body;
    const testimonial = new testimonialSchema({ name, description, rating });
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all testimonials
app.get('/api/testimonials', async (req, res) => {
  try {
    const testimonials = await testimonialSchema.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User registration route
app.post('/', async function (req, res) {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await usermodel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await usermodel.create({ ...req.body, password: hashedPassword });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Cart wishlist


const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'Unauthorized' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded); // Log decoded token to verify
    const user = await usermodel.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    console.error(err); // Log error to debug
    return res.status(401).json({ message: 'Invalid token' });
  }
};


// DElete wala
app.delete('/api/wishlist/:productId', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;

    req.user.wishlist = req.user.wishlist.filter(id => id.toString() !== productId);
    await req.user.save();

    res.json({ success: true, message: 'Removed from wishlist' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.delete('/api/cart/:productId', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;

    req.user.cart = req.user.cart.filter(id => id.toString() !== productId);
    await req.user.save();

    res.json({ success: true, message: 'Removed from cart' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Add to cart
app.post('/api/cart/:productId', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;

    // Ensure cart is an array before pushing
    if (!req.user.cart) {
      req.user.cart = [];
    }

    // Prevent adding the same product multiple times
    if (!req.user.cart.includes(productId)) {
      req.user.cart.push(productId);
      await req.user.save();
    }

    res.json({ success: true, message: 'Added to cart' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add to wishlist
app.post('/api/wishlist/:productId', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;

    // Ensure wishlist is an array before pushing
    if (!req.user.wishlist) {
      req.user.wishlist = [];
    }

    // Prevent adding the same product multiple times
    if (!req.user.wishlist.includes(productId)) {
      req.user.wishlist.push(productId);
      await req.user.save();
    }

    res.json({ success: true, message: 'Added to wishlist' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get cart items
app.get('/api/cart', authMiddleware, async (req, res) => {
  try {
    console.log('User:', req.user); // Log user
    await req.user.populate('cart');
    console.log('Populated cart:', req.user.cart); // Log result
    res.json(req.user.cart);
  } catch (err) {
    console.error('Error populating cart:', err); // Log error
    res.status(500).json({ error: err.message });
  }
});

// Get wishlist items
app.get('/api/wishlist', authMiddleware,async (req, res) => {
  try {
    await req.user.populate('wishlist');
    res.json(req.user.wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});






// Login route
app.post('/login', async function (req, res) {
  try {
    const { email, password } = req.body;

    const user = await usermodel.findOne({ email });
    if (!user) return res.status(404).json({ message: 'No user found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ message: 'Success', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});






//////

// Stripe Checkout - Create Session
app.post('/api/checkout', authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    await user.populate('cart');
    
    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const lineItems = user.cart.map(product => {
      if (!product.name || !product.price) {
        throw new Error('Invalid product in cart');
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            // images: [`http://localhost:3001/${product.image || 'default.png'}`],
            description: product.description || '',
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
     success_url: 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/cart',
      metadata: {
        userId: user._id.toString(),
      }
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Checkout session error:', error);
    res.status(500).json({ error: 'Failed to create Stripe session' });
  }
});

app.get('/api/checkout/session/:sessionId', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve Stripe session' });
  }
});



app.post('/api/orders', authMiddleware, async (req, res) => {
  try {
    const { paymentId, email, products } = req.body;

    const newOrder = new OrderModel({
      userId: req.user._id,
      email,
      paymentId,
      products,
    });

    await newOrder.save();

    // Clear cart after order
    req.user.cart = [];
    await req.user.save();

    res.json({ success: true, message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

























const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
