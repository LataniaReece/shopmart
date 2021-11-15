const router = require('express').Router();
const {verifyUser, verifyAdmin } = require('../middleware/authMiddleware')
const products = require('../controllers/products')


router.route('/:id')
    .get(products.getProductById)
    .put(verifyUser, verifyAdmin, products.updateProduct)
    .delete(verifyUser, verifyAdmin, products.deleteProduct)

router.route('/')
    .get(products.getAllProducts)
    .post(verifyUser, verifyAdmin, products.createProduct)

module.exports = router;