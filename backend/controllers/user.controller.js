const userModel = require('../models/user.models')
const {validationResult} = require('express-validator')
const userServices = require('../services/user.service');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()})
    }
    const {fullname, email, password} = req.body;

    const hashedPassword = await userModel.hashPassword(password);
    const user = await userServices.createUser({firstname: fullname.firstname, lastname: fullname.lastname, email, password: hashedPassword});

    const token = user.generateAuthToken();
    res.status(201).json({token, user})
}

module.exports.loginUser = async(req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(401).json({error: errors.array()})
    }

    const {email, password} = req.body;
    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({error: 'Invalid email or password'})
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({error: 'Invalid email or password'});
    }

    const token = user.generateAuthToken();

    res.cookie('token', token)

    return res.status(200).json({token, user});
}

module.exports.getUserProfile = async(req, res,  next) => {
    return res.status(200).json({user: req.user})
}

module.exports.logoutUser = async(req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    res.clearCookie('token');

    await blacklistTokenModel.create({token});
    return res.status(200).json({message: 'Logged out successfully'})
}