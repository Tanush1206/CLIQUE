import express from 'express';
import Event from '../models/Event.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { createLimiter, validateObjectId } from '../middleware/security.js';

const router = express.Router();

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, status, limit = 50, page = 1, featured } = req.query;
    
    // Build query
    const query = { isPublished: true };
    
    if (category) {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.isFeatured = true;
    }
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get events
    let events = await Event.find(query)
      .sort({ startAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .select('-__v');
    
    // Filter by status if needed
    if (status) {
      const now = new Date();
      events = events.filter(event => {
        if (status === 'upcoming') return new Date(event.startAt) > now;
        if (status === 'ongoing') return new Date(event.startAt) <= now && new Date(event.endAt) >= now;
        if (status === 'past') return new Date(event.endAt) < now;
        return true;
      });
    }
    
    // Get total count
    const total = await Event.countDocuments(query);
    
    res.json({
      success: true,
      count: events.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/events/:id
// @desc    Get single event by ID
// @access  Public
router.get('/:id', validateObjectId, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).select('-__v');
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }
    
    res.json({
      success: true,
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/events/slug/:slug
// @desc    Get single event by slug
// @access  Public
router.get('/slug/:slug', async (req, res) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug }).select('-__v');
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }
    
    res.json({
      success: true,
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   POST /api/events
// @desc    Create new event
// @access  Private/Admin
router.post('/', protect, adminOnly, createLimiter, async (req, res) => {
  try {
    const {
      title,
      slug,
      category,
      description,
      statusText,
      startAt,
      endAt,
      location,
      bannerUrl,
      registrationLink,
      registrationLinksByHouse,
      tags,
      isFeatured,
      isPublished,
    } = req.body;
    
    // Validate required fields
    if (!title || !slug || !category || !description || !startAt || !endAt || !location) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: title, slug, category, description, startAt, endAt, location',
      });
    }
    
    // Check if slug already exists
    const existingEvent = await Event.findOne({ slug });
    if (existingEvent) {
      return res.status(400).json({
        success: false,
        message: 'Event with this slug already exists',
      });
    }
    
    // Create event
    const event = await Event.create({
      title,
      slug,
      category,
      description,
      statusText,
      startAt,
      endAt,
      location,
      bannerUrl,
      registrationLink,
      registrationLinksByHouse,
      tags,
      isFeatured,
      isPublished,
      createdBy: req.user._id,
    });
    
    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   PUT /api/events/:id
// @desc    Update event
// @access  Private/Admin
router.put('/:id', protect, adminOnly, createLimiter, validateObjectId, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }
    
    // Update fields
    const allowedFields = [
      'title',
      'slug',
      'category',
      'description',
      'statusText',
      'startAt',
      'endAt',
      'location',
      'bannerUrl',
      'registrationLink',
      'registrationLinksByHouse',
      'tags',
      'isFeatured',
      'isPublished',
    ];
    
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        event[field] = req.body[field];
      }
    });
    
    await event.save();
    
    res.json({
      success: true,
      message: 'Event updated successfully',
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete event
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, createLimiter, validateObjectId, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }
    
    await event.deleteOne();
    
    res.json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   PATCH /api/events/:id/visibility
// @desc    Toggle event visibility
// @access  Private/Admin
router.patch('/:id/visibility', protect, adminOnly, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }
    
    event.isPublished = req.body.isPublished !== undefined ? req.body.isPublished : !event.isPublished;
    await event.save();
    
    res.json({
      success: true,
      message: `Event ${event.isPublished ? 'published' : 'unpublished'} successfully`,
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
