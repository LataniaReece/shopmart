const Cart = require('../models/cart');

// @desc    Get all Carts 
// @route   POST /api/carts
// @access  Private/Admin

module.exports.getAllCarts = async(req, res) =>{
    try {
        const carts = await Cart.find()
        return res.status(200).json(carts)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// @desc    Find User Cart 
// @route   POST /api/carts/find/:userId
// @access  Private
module.exports.findUserCart = async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId});
      return res.status(200).json(cart)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// @desc    Create Cart 
// @route   POST /api/carts
// @access  Private
module.exports.createCart = async (req, res) => {
    const newCart = new Cart(req.body);

    try {
       const savedCart = await newCart.save();
       return res.status(200).json(savedCart)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

// @desc    Update Cart
// @route   PUT /api/carts/:id
// @access  Private
module.exports.updateCart = async (req, res) =>{
    try{
        const id = req.params.id;
        const updatedCart = await Cart.findByIdAndUpdate(id, {...req.body}, { new: true }); 
        return res.status(200).json(updatedCart)
    }catch(error){
        return res.status(404).json({ message: error.message})
    }
};


// @desc    Delete Cart
// @route   DELETE /api/carts/:id
// @access  Private
module.exports.deleteCart = async (req, res) =>{
    const cart = await Cart.findById(req.params.id);

    try {
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' })
        } else {
            await Cart.findByIdAndDelete(req.params.id)
            return res.status(200).json({ message: 'Cart has been deleted'})
        }

    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
};