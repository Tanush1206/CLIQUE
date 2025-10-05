const express = require('express');
const router = express.Router();
const House = require('../models/House');

router.get('/', async (req, res, next) => {
  try {
    const houses = await House.find({}).sort({ name: 1 });
    res.json({ data: houses });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
