const express = require('express');
const Subscription = require('../models/Subscription');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all courses subscribed by the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;

    const subscriptions = await Subscription.find({ userId })
      .populate('courseId', 'title description price image')
      .sort({ subscribedAt: -1 });

    const myCourses = subscriptions.map(sub => ({
      id: sub._id,
      courseId: sub.courseId._id,
      title: sub.courseId.title,
      description: sub.courseId.description,
      pricePaid: sub.pricePaid,
      subscribedAt: sub.subscribedAt,
      image: sub.courseId.image,
    }));

    res.json(myCourses);
  } catch (error) {
    console.error('Get my courses error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

