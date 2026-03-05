const rideService = require('../services/ride.service');
const {validationResult} = require('express-validator');
const rideSchema = require('../models/ride.model')

module.export.createRide = async (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(500).json({errors: errors.array()})
    }
    const userId = req.user
    const {pickup, destination, vehicleType} = req.body

    const ride = await rideService.createRide(pickup, destination, vehicleType);
    
    res.status(201).json({message: 'Ride created'})

    


}