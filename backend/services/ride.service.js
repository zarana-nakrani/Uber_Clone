const mapService = require('./map.services');
const rideModel = require('../models/ride.model');
const crypto = require('crypto');

async function getFare(pickup, destination){
    const distance = await mapService.getDistanceTime(pickup, destination);
    
    const baseFare = {
        moto:30,
        car:50,
        auto:20,
    }

    const perKmRate = {
        auto:10,
        car:15,
        moto:8
    }

    const perMinuteRate = {
        auto:2,
        car:3,
        moto:1.5
    }

    console.log('Distance and time from map service:', parseInt(distance.distance), parseInt(distance.duration));
    const fare = {auto: (baseFare.auto + (distance.distance * perKmRate.auto) + (distance.duration * perMinuteRate.auto)),
        car: baseFare.car + (distance.distance * perKmRate.car) + (distance.duration * perMinuteRate.car),
        moto: baseFare.moto + (distance.distance * perKmRate.moto) + (distance.duration  * perMinuteRate.moto)
    }

    return fare
}

function getOtp(num) {
    return crypto.randomInt(Math.pow(10, num -1), Math.pow(10, num)).toString();
}

module.exports.createRide =  async(userId, pickup, destination, vehicleType) => {
    if(!userId || !pickup || !destination || !vehicleType){
        throw new Error('All fields are required');
    }

    try {
        console.log('Calculating fare for', pickup, destination, vehicleType);
        const fare = await getFare(pickup, destination);
        console.log('Calculated fare:', fare[vehicleType]);
        const ride = await rideModel.create({
            user: userId,
            pickup,
            destination,
            vehicleType,
            otp: getOtp(6),
            fare: fare[vehicleType],
        })
        

        return ride
        
    } catch (error) {
        return error
    }
}
