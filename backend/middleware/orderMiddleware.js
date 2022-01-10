const Order = require('../models/Order');

module.exports.isUserOrder = async (req, res, next) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  if (!order.user.equals(req.user._id)) {
    return res
      .status(401)
      .json({ message: 'You do not have permission to do that!' });
  }
  next();
};
