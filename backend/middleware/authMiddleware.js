const jwt = require('jsonwebtoken')
const User = require('../models/user');

module.exports.verifyUser = async (req, res, next) => {
    let token

    try {

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } else {
            return res.status(401).json({ message: 'Not authorized, no token' })
        }
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized, token failed' })
    }
}

module.exports.verifyAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        return res.status(401).json({ message: 'Not authorized as an admin' })
    }
}