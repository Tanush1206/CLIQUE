import express from 'express';
import { protect } from '../middleware/auth.js';

const router = express.Router();

/**
 * Example routes showing how to use authentication middleware
 */

// @route   GET /api/example/public
// @desc    Public route - anyone can access
// @access  Public
router.get('/public', (req, res) => {
  res.json({
    success: true,
    message: 'This is a public endpoint',
    data: {
      info: 'Anyone can access this without authentication',
    },
  });
});

// @route   GET /api/example/protected
// @desc    Protected route - requires authentication
// @access  Private
router.get('/protected', protect, (req, res) => {
  res.json({
    success: true,
    message: 'This is a protected endpoint',
    data: {
      info: 'Only authenticated users can access this',
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
    },
  });
});

// @route   GET /api/example/user-data
// @desc    Get user-specific data
// @access  Private
router.get('/user-data', protect, async (req, res) => {
  try {
    // You have access to req.user here
    // This is the authenticated user from the JWT token
    
    // Example: You can query database for user-specific data
    // const userPosts = await Post.find({ userId: req.user._id });
    
    res.json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        picture: req.user.picture,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
      },
      // Add any other user-specific data here
      stats: {
        joinedAt: req.user.createdAt,
        accountAge: Math.floor((Date.now() - new Date(req.user.createdAt).getTime()) / (1000 * 60 * 60 * 24)) + ' days',
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   POST /api/example/create
// @desc    Create something (example POST route)
// @access  Private
router.post('/create', protect, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required',
      });
    }

    // Example: Create something in database
    // const newItem = await Item.create({
    //   title,
    //   description,
    //   userId: req.user._id,
    // });

    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: {
        title,
        description,
        createdBy: req.user.name,
        userId: req.user._id,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   PUT /api/example/update/:id
// @desc    Update something (example PUT route)
// @access  Private
router.put('/update/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Example: Update item in database
    // const item = await Item.findById(id);
    // 
    // if (!item) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Item not found',
    //   });
    // }
    //
    // // Check if user owns this item
    // if (item.userId.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Not authorized to update this item',
    //   });
    // }
    //
    // item.title = title || item.title;
    // item.description = description || item.description;
    // await item.save();

    res.json({
      success: true,
      message: `Item ${id} updated successfully`,
      data: {
        id,
        title,
        description,
        updatedBy: req.user.name,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   DELETE /api/example/delete/:id
// @desc    Delete something (example DELETE route)
// @access  Private
router.delete('/delete/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;

    // Example: Delete item from database
    // const item = await Item.findById(id);
    // 
    // if (!item) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Item not found',
    //   });
    // }
    //
    // // Check if user owns this item
    // if (item.userId.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Not authorized to delete this item',
    //   });
    // }
    //
    // await item.deleteOne();

    res.json({
      success: true,
      message: `Item ${id} deleted successfully`,
      deletedBy: req.user.name,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
