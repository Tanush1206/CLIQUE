import express from 'express';
import House from '../models/House.js';
import PointTransaction from '../models/PointTransaction.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { createLimiter, validateObjectId } from '../middleware/security.js';

const router = express.Router();

// @route   GET /api/leaderboard
// @desc    Get current leaderboard standings
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { house, limit } = req.query;
    
    // Build query
    const query = {};
    
    if (house) {
      query.name = house.toUpperCase();
    }
    
    // Get houses sorted by points
    let houses = await House.find(query)
      .sort({ totalPoints: -1 })
      .select('-__v');
    
    if (limit) {
      houses = houses.slice(0, parseInt(limit));
    }
    
    res.json({
      success: true,
      count: houses.length,
      leaderboard: houses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/leaderboard/history
// @desc    Get point transaction history
// @access  Public
router.get('/history', async (req, res) => {
  try {
    const { houseId, category, limit = 50, page = 1 } = req.query;
    
    // Build query
    const query = {};
    
    if (houseId) {
      query.houseId = houseId;
    }
    
    if (category) {
      query.category = category;
    }
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get transactions
    const transactions = await PointTransaction.find(query)
      .populate('houseId', 'name color')
      .populate('eventId', 'title slug category')
      .populate('awardedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .select('-__v');
    
    // Get total count
    const total = await PointTransaction.countDocuments(query);
    
    res.json({
      success: true,
      count: transactions.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   POST /api/leaderboard/award
// @desc    Award or deduct points to/from a house
// @access  Private/Admin
router.post('/award', protect, adminOnly, createLimiter, async (req, res) => {
  try {
    const { houseId, points, eventId, reason, category } = req.body;
    
    // Validate required fields
    if (!houseId || points === undefined || !reason) {
      return res.status(400).json({
        success: false,
        message: 'Please provide houseId, points, and reason',
      });
    }
    
    // Validate points is a number
    if (typeof points !== 'number' || isNaN(points)) {
      return res.status(400).json({
        success: false,
        message: 'Points must be a valid number',
      });
    }
    
    // Find house
    const house = await House.findById(houseId);
    
    if (!house) {
      return res.status(404).json({
        success: false,
        message: 'House not found',
      });
    }
    
    // Create point transaction
    const transaction = await PointTransaction.create({
      houseId,
      points,
      eventId,
      reason,
      category: category || 'other',
      awardedBy: req.user._id,
    });
    
    // Update house total points
    house.totalPoints += points;
    await house.save();
    
    // Populate transaction for response
    await transaction.populate('houseId', 'name color');
    await transaction.populate('eventId', 'title slug');
    await transaction.populate('awardedBy', 'name email');
    
    res.status(201).json({
      success: true,
      message: `${points > 0 ? 'Awarded' : 'Deducted'} ${Math.abs(points)} points ${points > 0 ? 'to' : 'from'} ${house.name}`,
      transaction,
      house: {
        id: house._id,
        name: house.name,
        totalPoints: house.totalPoints,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/leaderboard/stats
// @desc    Get leaderboard statistics
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const houses = await House.find().sort({ totalPoints: -1 });
    
    const totalPoints = houses.reduce((sum, house) => sum + house.totalPoints, 0);
    const avgPoints = houses.length > 0 ? totalPoints / houses.length : 0;
    
    const leader = houses[0];
    const pointDifference = houses.length > 1 ? houses[0].totalPoints - houses[1].totalPoints : 0;
    
    res.json({
      success: true,
      stats: {
        totalHouses: houses.length,
        totalPoints,
        avgPoints: Math.round(avgPoints),
        leader: leader ? {
          name: leader.name,
          points: leader.totalPoints,
          color: leader.color,
        } : null,
        pointDifference,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
