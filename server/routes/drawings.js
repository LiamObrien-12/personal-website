const express = require('express');
const router = express.Router();
const Drawing = require('../models/Drawing');
const authMiddleware = require('../middleware/auth');

// Get all drawings
router.get('/', async (req, res) => {
  try {
    const drawings = await Drawing.find().sort({ date: -1 });
    res.json(drawings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Save new drawing
router.post('/', async (req, res) => {
  const drawing = new Drawing({
    image: req.body.image,
    artist: req.body.artist
  });

  try {
    const newDrawing = await drawing.save();
    res.status(201).json(newDrawing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a drawing
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const drawing = await Drawing.findByIdAndDelete(req.params.id);
    if (!drawing) {
      return res.status(404).json({ message: 'Drawing not found' });
    }
    res.json({ message: 'Drawing deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 