const Order = require('../models/order');

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
module.exports.getAllOrders = async(req, res) =>{
    try {
        const orders = await Order.find()
        return res.status(200).json(orders)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

// @desc    Find User Order 
// @route   POST /api/orders/find/:userId
// @access  Private
module.exports.findUserOrder = async (req, res) => {
    try {
      const order = await Order.findOne({ userId: req.params.userId});
      return res.status(200).json(order)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// @desc    Create an Order 
// @route   POST /api/order
// @access  Private/Admin
module.exports.createOrder = async (req, res) => {
    const newOrder = new Order({
        ...req.body,
        user: req.user._id
    });

    try {
       const savedOrder = await newOrder.save();
       return res.status(200).json(savedOrder)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

// @desc    Update Order
// @route   PUT /api/orders/:id
// @access  Private/Admin
module.exports.updateOrder = async (req, res) =>{
    try{
        const id = req.params.id;
        const updatedOrder = await Order.findByIdAndUpdate(id, {...req.body}, { new: true }); 
        return res.status(200).json(updatedOrder)
    }catch(error){
        return res.status(404).json({ message: error.message})
    }
};

// @desc    Delete Order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
module.exports.deleteOrder = async (req, res) =>{
    const order = await Order.findById(req.params.id);

    try {
        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        } else {
            await Order.findByIdAndDelete(req.params.id)
            return res.status(200).json({ message: 'Order has been deleted'})
        }

    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
};


// @desc    Get monthly income
// @route   GET /api/orders/stats
// @access  Private/Admin
module.exports.getMonthlyIncome = async (req, res) =>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try{
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth }}},
            {
                $project:{
                    month: {$month: "$createdAt"},
                    sales: "$amount"
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: "$sales"}
                }
            },
        ]);
        res.status(200).json(income)
    }catch(error){
        return res.status(404).json({ message: error.message})
    }
};