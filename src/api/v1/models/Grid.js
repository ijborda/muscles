const mongoose = require('mongoose');

const GridSchema = new mongoose.Schema({
  2022: {
    jan: {
      type: [Number],
      default: new Array(31).fill(0)
    },
    feb: {
      type: [Number],
      default: new Array(28).fill(0)
    },
    mar: {
      type: [Number],
      default: new Array(31).fill(0)
    },
    apr: {
      type: [Number],
      default: new Array(30).fill(0)
    },
    may: {
      type: [Number],
      default: new Array(31).fill(0)
    },
    jun: {
      type: [Number],
      default: new Array(30).fill(0)
    },
    jul: {
      type: [Number],
      default: new Array(31).fill(0)
    },
    aug: {
      type: [Number],
      default: new Array(31).fill(0)
    },
    sep: {
      type: [Number],
      default: new Array(30).fill(0)
    },
    oct: {
      type: [Number],
      default: new Array(31).fill(0)
    },
    nov: {
      type: [Number],
      default: new Array(31).fill(0)
    },
    dec: {
      type: [Number],
      default: new Array(30).fill(0)
    },
  },
  status: {
    type: String,
    default: 'public',
    enum: ['public', 'private']
  }, 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

module.exports = mongoose.model('Grid', GridSchema);