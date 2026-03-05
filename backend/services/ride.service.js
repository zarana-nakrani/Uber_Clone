const mapService = require('./map.services');
const Ride = require('../models/ride.model');

async function getFare(pickup, destination){
    const distance = await mapService.getDistanceAndTime(pickup, destination);
    
    const baseFare = {
        moto:30,
        car:50,
        auto:20,
    }

    const perKmRate = {
        auto:10,
        care:15,
        moto:8
    }

    const perMinuteRate = {
        auto:2,
        care:3,
        moto:1.5
    }


    const fare = {auto: baseFare.auto + ((distance.distance.value / 1000) * perKmRate.auto) + ((distance.duration.value / 60) * perMinuteRate.auto),
        car: baseFare.car + ((distance.distance.value / 1000) * perKmRate.car) + ((distance.duration.value / 60) * perMinuteRate.car),
        moto: baseFare.moto + ((distance.distance.value / 1000) * perKmRate.moto) + ((distance.duration.value / 60) * perMinuteRate.moto)
    }
}

module.exports.createRide =  async(userId, pickup, destination, vehicleType) => {
    if(!userId || !pickup || !destination || !vehicleType){
        throw new Error('All fields are required');
    }

    try {
        const fare = await getFare(pickup, destination, vehicleType);
        const ride = await Ride.create({
            user: userId,
            pickup,
            destination,
            vehicleType
        })

        return ride


        
    } catch (error) {
        
    }
}
