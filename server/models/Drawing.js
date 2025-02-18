const mongoose = require('mongoose');

const DrawingSchema = new mongoose.Schema({
  image: String,
  artist: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Drawing', DrawingSchema); 