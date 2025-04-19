const userModel = require('../models/user.models')
const {validationResult} = require('express-validator')
const userServices = require('../services/user.service');

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