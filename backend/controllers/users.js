const User = require('../models/user');
const Order = require('../models/order');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
module.exports.getAllUsers = async (req, res) => {
  const query = req.query.new;

  try {
    const users = query
      ? await User.find().sort({ createdAt: -1 }).limit(6)
      : await User.find({}).select('-password');

    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// @desc    Get User Info
// @route   POST /api/users/:id
// @access  Private/Admin
module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// @desc    Update User
// @route   PUT /api/users/:id
// @access  Private
module.exports.updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJs.AES.encrypt(
      req.body.password,
      process.env.JWT_SECRET
    ).toString();
  }
  try {
    const id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// @desc    Delete user
// @route   Delete /api/users/:id
// @access  Private/Admin
module.exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  try {
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } else {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: 'User has been deleted' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get user stats
// @route   GET /api/users/stats
// @access  Private/Admin
module.exports.getUserStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// @desc    Get all user orders
// @route   GET /api/users/orders
// @access  Private
module.exports.getAllUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
