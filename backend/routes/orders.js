const router = require('express').Router();
const { verifyUser, verifyAdmin } = require('../middleware/authMiddleware');
const orders = require('../controllers/orders')

router.route('/stats')
    .get(verifyUser, verifyAdmin, orders.getMonthlyIncome)

router.route('/find/:userId')
    .get(verifyUser, verifyAdmin, orders.findUserOrder)

router.route('/:id')
    .put(verifyUser, verifyAdmin, orders.updateOrder)

router.route('/')
    .get(verifyUser, verifyAdmin, orders.getAllOrders)
    .post(verifyUser, orders.createOrder)
    .delete(verifyUser, verifyAdmin, orders.deleteOrder)

module.exports = router;