const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/register', [
    body('email').isEmail().withMessage('Email is required'),
    body('fullname.firstname').isLength({min: 3}).withMessage('Firstname is required'),
    body('password').isLength({ min: 6 }).withMessage('Password should be atleast 6 characters long'),
    body('vehicle.color').isLength({min: 3}).withMessage('Vehicle color is required'),
    body('vehicle.capacity').isNumeric().withMessage('Vehicle capacity is required'),
    body('vehicle.plateNumber').isLength({min: 3}).withMessage('Vehicle plate number is required'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Vehicle type is required')
], 
captainController.registerCaptain
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('Password should be atleast 6 characters long')
], captainController.loginCaptain
)

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile)
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)

module.exports = router