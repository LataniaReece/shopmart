const router = require('express').Router();
const { verifyUser, verifyAdmin } = require('../middleware/authMiddleware');
const carts = require('../controllers/carts')

router.route('/find/:userId')
    .get(verifyUser, carts.findUserCart)

router.route('/:id')
    .put(verifyUser, carts.updateCart)

router.route('/')
    .get(verifyUser, verifyAdmin, carts.getAllCarts)
    .post(verifyUser, carts.createCart)
    .delete(verifyUser, carts.deleteCart)

module.exports = router;