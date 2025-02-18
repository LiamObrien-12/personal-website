const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const drawingsRouter = require('./routes/drawings');
const authRouter = require('./routes/auth');
const Admin = require('./models/Admin');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // For handling large image data

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
console.log('Attempting to connect to MongoDB...'); // Add this line for debugging

// Initialize admin account
const initializeAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ username: process.env.ADMIN_USERNAME });
    if (!adminExists) {
      await Admin.create({
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD
      });
      console.log('Admin account created');
    }
  } catch (error) {
    console.error('Error creating admin account:', error);
  }
};

// Call after MongoDB connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    initializeAdmin();
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/drawings', drawingsRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 