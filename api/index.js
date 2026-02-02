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

// Routes - Vercel already routes /api/* to this file, so use base paths
app.use('/auth', require('../server/routes/auth'));
app.use('/courses', require('../server/routes/courses'));
app.use('/subscribe', require('../server/routes/subscriptions'));
app.use('/my-courses', require('../server/routes/myCourses'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Course Subscription API is running!' });
});

// Export for Vercel serverless
module.exports = app;

