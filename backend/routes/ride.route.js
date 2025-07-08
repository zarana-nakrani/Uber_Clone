const express = require('express');
const router = express.Router();
const rideController = require('../controllers/ride.controller');
const { body } = require('express-validator');
const { authUser } = require('../middlewares/auth.middleware');

router.post('/create-ride',
    authUser,
    body('pickup').isString().isLength({min: 3}).withMessage('Pickup location is required'),
    body('destination').isString().isLength({min: 3}).withMessage('Destination location is required'),
    body('vehicleType').isString().isLength({min: 3}).withMessage('vehicle type is required'),
     rideController.createRide);
router.get('/get-ride/:id', rideController.getRide);
router.get('/get-all-rides', rideController.getAllRides);
router.put('/update-ride/:id', rideController.updateRide);
router.delete('/delete-ride/:id', rideController.deleteRide);

module.exports = router;