const express = require('express');
const router = express.Router();
const { createRide, listRides, joinRide, leaveRide } = require('../controllers/rideController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', listRides);
router.post('/', authMiddleware, createRide);
router.post('/:id/join', authMiddleware, joinRide);
router.post('/:id/leave', authMiddleware, leaveRide);

module.exports = router;