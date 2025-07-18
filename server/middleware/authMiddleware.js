const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } else {
    res.status(401);
    throw new Error('Not Authorized');
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  if (!req.user?.isAdmin) {
    res.status(403);
    throw new Error('Access Denied - Admin Only');
  }
  next();
});

module.exports = {
  protect,
  isAdmin,
};
