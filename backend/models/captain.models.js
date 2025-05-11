const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname:{
            type: String,
            required: true,
            minlength: [3, 'Firstname should be atleast 3 characters long'],
        },
        lastname: {
            type: String,
            required: true,
            minlength: [3, 'Lastname should be atleast 3 characters long'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password should be atleast 6 characters long'],
        select: false,
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            default: 'black',
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity should be atleast 1'],
            default: 1,
        },
        plateNumber: {
            type: String,
            minlength: [3, 'Plate number should be atleast 3 characters long'],
            required: true,
            unique: true,
        },
        vehicleType: {
            type: String,
            enum: ['car', 'bike', 'auto'],
            required: true,
        }
    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
})

captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id:this._id}, process.env.JWT_SECRET);
    return token;
}

captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

module.exports = mongoose.model('captain', captainSchema);