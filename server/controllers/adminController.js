
const asyncHandler = require('express-async-handler');
const Job = require('../models/jobModels');
const User = require('../models/userModel');

// @desc    Get admin dashboard summary
// @route   GET /api/admin/summary
// @access  Private/Admin
const getAdminSummary = asyncHandler(async (req, res) => {
  const totalJobs = await Job.countDocuments();
  const totalUsers = await User.countDocuments();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const newJobsToday = await Job.countDocuments({
    postedDate: { $gte: today },
  });

  res.json({ totalJobs, totalUsers, newJobsToday });
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password'); // exclude password
  res.json(users);
});

//@desc   Get jobGrowth by role
// @route GET /api/admin/job-growth
// @access Private/Admin
const getJobGrowth = asyncHandler(async (req, res) => {
  const roleFilter = req.query.role;

  const matchStage = roleFilter ? { role: roleFilter } : {};

  const jobGrowth = await Job.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: { $substr: ['$postedDate', 0, 7] }, // 'YYYY-MM'
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.json(jobGrowth);
});

module.exports = { getAdminSummary, getAllUsers, getJobGrowth ,};
