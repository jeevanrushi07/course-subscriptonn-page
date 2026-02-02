// Main Vercel serverless function
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable is not set!');
}

let isConnected = false;
let connectionPromise = null;

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  connectionPromise = mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
    .then(() => {
      isConnected = true;
      console.log('✅ MongoDB connected');
      return true;
    })
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err.message);
      isConnected = false;
      connectionPromise = null;
      throw err;
    });

  return connectionPromise;
};

// Middleware to ensure DB connection before routes
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('Database connection failed:', err.message);
    res.status(500).json({ 
      message: 'Database connection failed', 
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message 
    });
  }
});

// Import routes
app.use('/api/auth', require('../server/routes/auth'));
app.use('/api/courses', require('../server/routes/courses'));
app.use('/api/subscribe', require('../server/routes/subscriptions'));
app.use('/api/my-courses', require('../server/routes/myCourses'));

// Health check
app.get('/api', async (req, res) => {
  try {
    await connectDB();
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({ 
      message: 'Course Subscription API is running!', 
      status: 'ok',
      database: dbStatus,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ 
      message: 'API is running but database connection failed', 
      error: err.message 
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found', path: req.path });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ 
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
});

module.exports = app;

