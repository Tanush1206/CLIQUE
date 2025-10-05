const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/events.controller');

router.get('/', ctrl.list);
router.get('/:slug', ctrl.read);
router.post('/', ctrl.create); // TODO: admin guard
router.patch('/:id', ctrl.update); // TODO: admin guard
router.delete('/:id', ctrl.remove); // TODO: admin guard

module.exports = router;
