const router = require('express').Router();
const users = require('../controllers/users')
const {verifyUser, verifyAdmin } = require('../middleware/authMiddleware')

router.route('/stats')
    .get(verifyUser, verifyAdmin, users.getUserStats)

router.get('/orders', verifyUser, users.getAllUserOrders)
    
router.route('/:id')
    .get(verifyUser, verifyAdmin, users.getUserById)
    .put(verifyUser, users.updateUser)
    .delete(verifyUser, users.deleteUser)


router.route('/').get(verifyUser, verifyAdmin, users.getAllUsers)

module.exports = router;