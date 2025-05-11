const captainService = require('../services/captain.services');
const {validationResult} = require('express-validator');
const captainModel = require('../models/captain.models')
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(401).json({errors: errors.array()})
    }


    const {fullname, email, password, status, vehicle, location} = req.body;

    const existingCaptain = await captainModel.findOne({email});
    if(existingCaptain){
        return res.status(401).json({error: 'Captain already exists'})
    }
    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname, lastname: fullname.lastname, email, password: hashedPassword, status, location, color: vehicle.color, capacity: vehicle.capacity, vehicleType: vehicle.vehicleType, plateNumber: vehicle.plateNumber
    });

    const token = captain.generateAuthToken();

    return res.status(201).json({token, captain})
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(401).json({errors: errors.array()})
    }

    const {email, password} = req.body;
    const captain = await captainModel.findOne({email}).select('+password');

    if(!captain){
        return res.status(404).json({error: 'Invalid email or password'});
    }

    const isMatch = await captain.comparePassword(password);
    if(!isMatch){
        return res.status(404).json({error: 'Invalid email or password'});
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token)

    return res.status(200).json({token, captain})
 }

 module.exports.getCaptainProfile = async(req, res, next) => {
    return res.status(200).json({captain: req.captain})
 }

 module.exports.logoutCaptain = async(req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({token});

    res.clearCookie('token');

    return res.status(200).json({message: 'Logged out successfully'})
 }

 
