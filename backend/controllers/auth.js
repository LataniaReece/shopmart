const User = require('../models/user');
const CryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')

// @desc    Register User
// @route   POST /api/users/register
// @access  Public
module.exports.register = async (req, res, next) =>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(
            req.body.password, 
            process.env.CRYPTO_SECRET
        )
    });
    
    try{
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    }catch(error){
        return res.status(500).json({ message: error.message})
    }
};

// @desc    Login User
// @route   POST /api/users/login
// @access  Public
module.exports.login = async (req, res) =>{
    try {
        const user = await User.findOne({ username: req.body.username})
        !user && res.status(401).json('Wrong credentials')

        const hashedPassword = CryptoJs.AES.decrypt(
            user.password, 
            process.env.CRYPTO_SECRET
        )

        const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);

        originalPassword !== req.body.password && res.status(401).json('Wrong Credentials!')

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, 
        process.env.JWT_SECRET,
        { expiresIn:'3d'}
    )

        const { password, ...others} = user._doc

        return res.status(201).json({...others, accessToken})

    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
};
