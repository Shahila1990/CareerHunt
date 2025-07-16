
const express = require('express');
const router = express.Router();
const { getAdminSummary , getAllUsers } = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.get('/summary', protect, isAdmin, getAdminSummary);
router.get('/users', protect, isAdmin, getAllUsers);

module.exports = router;
