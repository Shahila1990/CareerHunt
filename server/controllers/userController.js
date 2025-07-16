const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

// @desc    Save a job to user's savedJobs
// @route   POST /api/users/save/:jobId
// @access  Private
const saveJob = asyncHandler(async (req,res) => {
    const user = req.user
    const jobId = req.params.jobId

    if (!user.savedJobs.includes(jobId)){
        user.savedJobs.push(jobId)
        await user.save()
    }
    res.json(user.savedJobs)
})

// @desc    Remove a job from user's savedJobs
// @route   DELETE /api/users/save/:jobId
// @access  Private
const unsaveJob = asyncHandler(async (req,res) => {
    const user = req.user
    const jobId = req.params.jobId

    user.savedJobs = user.savedJobs.filter(id => id.toString() !==jobId)
    await user.save()
    res.json(user.savedJobs)
})

// @desc    Get all saved jobs for the user
// @route   GET /api/users/saved
// @access  Private
const getSavedJobs = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('savedJobs');
  res.json(user.savedJobs);
});

// @desc    Get current user's profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password').populate('savedJobs');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json(user);
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (name) user.name = name;
  

  // Handle password update
  if (currentPassword && newPassword) {
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      res.status(400);
      throw new Error('Current password is incorrect');
    }
    user.password = newPassword; 
    
  }

  const updatedUser = await user.save();
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    
   
  });
});

module.exports = {
  saveJob,
  unsaveJob,
  getSavedJobs,
  getUserProfile,
  updateUserProfile,
};