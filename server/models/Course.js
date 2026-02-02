const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  detailedContent: {
    type: String,
    default: '',
  },
  whatYouWillLearn: {
    type: [String],
    default: [],
  },
  duration: {
    type: String,
    default: '',
  },
  instructor: {
    type: String,
    default: '',
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner',
  },
  lessons: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  image: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Course', courseSchema);

