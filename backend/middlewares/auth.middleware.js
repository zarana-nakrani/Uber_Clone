const userModel = require('../models/user.models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const blacklistTokenModel = require('../models/blacklistToken.model')

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({error: 'Unauthorized user'})
    }

    const blacklistedToken = await blacklistTokenModel.findOne({token})

    if(blacklistedToken){
        return res.status(401).json({error: 'Unauthorized user'})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded._id)

        req.user = user;
        return next();
        
    } catch(err){
        return res.status(401).json({error: 'Unauthorized user'})
    }
}