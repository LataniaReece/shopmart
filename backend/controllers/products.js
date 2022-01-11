const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
module.exports.getAllProducts = async (req, res) => {
  const qCategory = req.query.category;

  try {
    let products;

    if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      }).sort({ createdAt: -1 });
    } else {
      products = await Product.find().sort({ createdAt: -1 });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};

// @desc    Get Product Info
// @route   POST /api/products/:id
// @access  Public
module.exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    return res.status(200).json(product);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// @desc    Create a Product
// @route   POST /api/products
// @access  Private/Admin
module.exports.createProduct = async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    return res.status(200).json(savedProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Update Product
// @route   PUT /api/products/:id
// @access  Private/Admin
module.exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// @desc    Delete Product
// @route   DELETE /api/products/:id
// @access  Private/Admin
module.exports.deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  try {
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    } else {
      await Product.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: 'Product has been deleted' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
