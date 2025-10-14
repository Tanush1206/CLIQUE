import express from 'express';
import House from '../models/House.js';

const router = express.Router();

// @route   GET /api/houses
// @desc    Get all houses
// @access  Public
router.get('/', async (req, res) => {
  try {
    const houses = await House.find()
      .sort({ totalPoints: -1 })
      .select('-__v');
    
    res.json({
      success: true,
      count: houses.length,
      houses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/houses/:id
// @desc    Get house by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const house = await House.findById(req.params.id).select('-__v');
    
    if (!house) {
      return res.status(404).json({
        success: false,
        message: 'House not found',
      });
    }
    
    res.json({
      success: true,
      house,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/houses/name/:name
// @desc    Get house by name
// @access  Public
router.get('/name/:name', async (req, res) => {
  try {
    const house = await House.findOne({ name: req.params.name.toUpperCase() }).select('-__v');
    
    if (!house) {
      return res.status(404).json({
        success: false,
        message: 'House not found',
      });
    }
    
    res.json({
      success: true,
      house,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
