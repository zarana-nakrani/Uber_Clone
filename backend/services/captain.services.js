const captainModel = require('../models/captain.models');

module.exports.createCaptain = async ({firstname, lastname, email, password, color, capacity, plateNumber, vehicleType}) => {
    if(!firstname || !email || !password || !color || !capacity || !plateNumber || !vehicleType) {
        throw new Error('All fields are required')
    }

    const captain = await captainModel.create({
        fullname:{
            firstname, lastname,
        },
        password, email,
        vehicle: {
            color, capacity, plateNumber, vehicleType
        }
    })

    return captain
}