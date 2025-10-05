const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/leaderboard.controller');

router.get('/', ctrl.getLeaderboard);
router.post('/award', ctrl.awardPoints); // TODO: admin guard

module.exports = router;
