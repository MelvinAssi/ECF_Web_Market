const express = require('express');
const router = express.Router();;

const { body } = require('express-validator');
const authControllers = require('../controllers/authControllers');



router.post('/emailVerified', [
    body('email').isEmail().withMessage('Invalid email'),
], authControllers.emailVerified);

router.post('/signin', [
  body('email').isEmail().withMessage('Invalid email'),
  body('password')
    .isLength({ min: 12,max:64 }).withMessage('Password must be at least 12 characters')
    .matches(/[A-Z]/).withMessage('Must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Must contain at least one lowercase letter')
    .matches(/\d/).withMessage('Must contain at least one number')
    .matches(/[!@#$%^&*]/).withMessage('Must contain at least one special character'),
], authControllers.signinUser);


router.post('/signup', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password')
        .isLength({ min: 12,max:64 }).withMessage('Password must be between 12 and 64 characters')
        .matches(/[A-Z]/).withMessage('Must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Must contain at least one lowercase letter')
        .matches(/\d/).withMessage('Must contain at least one number')
        .matches(/[!@#$%^&*]/).withMessage('Must contain at least one special character'),
    body('name')
        .isLength({ min: 12,max:64 }).withMessage('Name must be between 12 and 64 characters'),
    body('firstname')
        .isLength({ min: 12,max:64 }).withMessage('Firstname must be between 12 and 64 characters'),
    body('adress')
        .isLength({ min: 12,max:64 }).withMessage('Adress must be between 12 and 64 characters'),
    body('phone')
        .isLength({ min: 10,max:64 }).withMessage('Phone must be between 12 and 64 characters'),
], authControllers.signinUser);



module.exports = router;