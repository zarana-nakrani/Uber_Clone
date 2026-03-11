const rideService = require('../services/ride.service');
const {validationResult} = require('express-validator');
const rideSchema = require('../models/ride.model')

module.exports.createRide = async (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(500).json({errors: errors.array()})
    }
    const userId = req.user
    const {pickup, destination, vehicleType} = req.body
    try {
        const ride = await rideService.createRide(req.user._id, pickup, destination, vehicleType);
        
        res.status(201).json({ride})
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}