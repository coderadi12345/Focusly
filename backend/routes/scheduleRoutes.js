const express = require('express');
const router = express.Router();
const {
  generateSchedule,
  getSchedule,
  completeTask,
} = require('../controllers/scheduleController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getSchedule);
router.route('/generate').post(protect, generateSchedule);
router.route('/:taskId/complete').put(protect, completeTask);

module.exports = router;
