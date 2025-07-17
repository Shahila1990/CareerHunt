const express = require('express');
const router = express.Router();
const {
  getAdminSummary,
  getAllUsers,
  getJobGrowth,
} = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.get('/summary', protect, isAdmin, getAdminSummary);
router.get('/users', protect, isAdmin, getAllUsers);
router.get('/job-growth', protect, isAdmin, getJobGrowth);

module.exports = router;
