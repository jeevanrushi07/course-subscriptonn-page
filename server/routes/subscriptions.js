const express = require('express');
const Subscription = require('../models/Subscription');
const Course = require('../models/Course');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Valid promo code
const VALID_PROMO_CODE = 'BFSALE25';
const PROMO_DISCOUNT = 0.5; // 50% discount

// Check if user is subscribed to a course
router.get('/check/:courseId', authMiddleware, async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;

    const subscription = await Subscription.findOne({ userId, courseId });
    
    res.json({
      isSubscribed: !!subscription,
      subscription: subscription ? {
        id: subscription._id,
        pricePaid: subscription.pricePaid,
        subscribedAt: subscription.subscribedAt,
      } : null,
    });
  } catch (error) {
    console.error('Check subscription error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Subscribe to a course
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { courseId, promoCode } = req.body;
    const userId = req.user._id;

    // Validation
    if (!courseId) {
      return res.status(400).json({ message: 'Course ID is required' });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already subscribed
    const existingSubscription = await Subscription.findOne({ userId, courseId });
    if (existingSubscription) {
      return res.status(400).json({ message: 'Already subscribed to this course' });
    }

    let pricePaid = course.price;

    // Handle paid courses
    if (course.price > 0) {
      if (!promoCode) {
        return res.status(400).json({ message: 'Promo code is required for paid courses' });
      }

      if (promoCode !== VALID_PROMO_CODE) {
        return res.status(400).json({ message: 'Invalid promo code' });
      }

      // Apply discount
      pricePaid = course.price * (1 - PROMO_DISCOUNT);
    }

    // Create subscription
    const subscription = new Subscription({
      userId,
      courseId,
      pricePaid: Math.round(pricePaid * 100) / 100, // Round to 2 decimal places
    });

    await subscription.save();

    res.status(201).json({
      message: 'Successfully subscribed to course',
      subscription: {
        id: subscription._id,
        courseId: subscription.courseId,
        pricePaid: subscription.pricePaid,
        subscribedAt: subscription.subscribedAt,
      },
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

