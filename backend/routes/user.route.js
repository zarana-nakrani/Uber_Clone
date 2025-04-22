const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Email is required'),
    body('fullname.firstname')
      .isLength({ min: 3 })
      .withMessage('Firstname should be atleast 3 characters long'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password should be atleast 6 characters long'),
  ],
  userController.registerUser
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 6}).withMessage('Password should be atleast 6 characters long')
], userController.loginUser)

router.get('/profile', authMiddleware.authUser, userController.getUserProfile)

router.post('/logout', authMiddleware.authUser, userController.logoutUser)

module.exports = router
