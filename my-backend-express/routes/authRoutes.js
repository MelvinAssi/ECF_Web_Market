const express = require('express');
const router = express.Router();;

const { body } = require('express-validator');
const authControllers = require('../controllers/authControllers');
const authMiddleware = require('../middleware/auth')
const verifyRecaptcha = require('../middleware/verifyRecaptcha')

router.post('/check-email-existence', [
    body('email').isEmail().withMessage('Invalid email'),
], authControllers.checkEmailExistence);

router.post('/signin',verifyRecaptcha, [
  body('email').isEmail().withMessage('Invalid email'),
  body('password')
    .isLength({ min: 12,max:64 }).withMessage('Password must be at least 12 characters')
    .matches(/[A-Z]/).withMessage('Must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Must contain at least one lowercase letter')
    .matches(/\d/).withMessage('Must contain at least one number')
    .matches(/[!@#$%^&*]/).withMessage('Must contain at least one special character'),
], authControllers.signInUser);


router.post('/check-email-availability', [
  body('email').isEmail().withMessage('Invalid email'),
], authControllers.checkEmailAvailability);

router.post('/signup',verifyRecaptcha, [
  body('email').isEmail().withMessage('Invalid email'),
  body('password')
    .isLength({ min: 12, max: 64 }).withMessage('Password must be between 12 and 64 characters')
    .matches(/[A-Z]/).withMessage('Must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Must contain at least one lowercase letter')
    .matches(/\d/).withMessage('Must contain at least one number')
    .matches(/[!@#$%^&*]/).withMessage('Must contain at least one special character'),
  body('name').isLength({ min: 2, max: 64 }).withMessage('Name must be between 2 and 64 characters'),
  body('firstname').isLength({ min: 2, max: 64 }).withMessage('Firstname must be between 2 and 64 characters'),
  body('adress').isLength({ min: 2, max: 64 }).withMessage('Adress must be between 2 and 64 characters'),
  body('phone').matches(/^[0-9]{10}$/).withMessage('Phone must be a valid 10-digit number'),
], authControllers.signUpUser);

router.post("/google", authControllers.authWithGoogle);
router.post('/signout', authControllers.signOutUser);

router.get('/me', authMiddleware, (req, res) => {
  if (!req.user) {
    return res.status(401).json({ user: null });
  }
  res.status(200).json({ user: req.user });
});
module.exports = router;