// Vercel serverless function wrapper for Express app
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/course-subscription';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes - adjust paths for /api prefix
app.use('/api/auth', require('../server/routes/auth'));
app.use('/api/courses', require('../server/routes/courses'));
app.use('/api/subscribe', require('../server/routes/subscriptions'));
app.use('/api/my-courses', require('../server/routes/myCourses'));

// Health check
app.get('/api', (req, res) => {
  res.json({ message: 'Course Subscription API is running!' });
});

// Export for Vercel serverless
module.exports = app;

