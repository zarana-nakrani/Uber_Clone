const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength: [3, 'First name should be atleast 3 characters long'],
        },
        lastname:{
            type: String,
            minlength: [3, 'First name should be atleast 3 characters long'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'email should be atleast 5 characters long']
    },
    //when we send a request to fetch user data using email, select: false will not bring the password from the database
    //but when we create a new user, we need to hash the password and save it in the database
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [6, 'Password should be atleast 6 characters long'],
    },
    socketId: {
        type: String,
    }
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET)
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10)
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;