const express = require('express');
const router = express.Router();;

const { body } = require('express-validator');
const userControllers = require('../controllers/userControllers');
const authMiddleware = require('../middleware/auth')
const hasRoles = require('../middleware/hasRoles');

router.get('/admin', authMiddleware, hasRoles('ADMIN'), userControllers.getAllUsers);


router.get('/', authMiddleware, userControllers.fetchUserData);

router.get('/:id', authMiddleware,hasRoles('ADMIN'), userControllers.getUser);
router.put('/admin/:id', authMiddleware,hasRoles('ADMIN'), userControllers.updateUser);

router.put('/',authMiddleware,[
    body('password')
        .isLength({ min: 12, max: 64 }).withMessage('Password must be between 12 and 64 characters')
        .matches(/[A-Z]/).withMessage('Must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Must contain at least one lowercase letter')
        .matches(/\d/).withMessage('Must contain at least one number')
        .matches(/[!@#$%^&*]/).withMessage('Must contain at least one special character'),
    body('newPassword')
        .optional({ checkFalsy: true })
        .isLength({ min: 12, max: 64 }).withMessage('Password must be between 12 and 64 characters')
        .matches(/[A-Z]/).withMessage('Must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Must contain at least one lowercase letter')
        .matches(/\d/).withMessage('Must contain at least one number')
        .matches(/[!@#$%^&*]/).withMessage('Must contain at least one special character'),
    body('newName')
        .optional({ checkFalsy: true })
        .isLength({ min: 2, max: 64 }).withMessage('Name must be between 2 and 64 characters'),
    body('newFirstname')
        .optional({ checkFalsy: true })
        .isLength({ min: 2, max: 64 }).withMessage('Firstname must be between 2 and 64 characters'),
    body('newAdress')
        .optional({ checkFalsy: true })
        .isLength({ min: 2, max: 64 }).withMessage('Adress must be between 2 and 64 characters'),
    body('newPhone')
        .optional({ checkFalsy: true })
        .matches(/^[0-9]{10}$/).withMessage('Phone must be a valid 10-digit number'),
    body('newRole')
        .optional({ checkFalsy: true })
    
],userControllers.updateUserData );

router.delete('/',
    authMiddleware,
    [
      body('password')
        .isLength({ min: 12, max: 64 }).withMessage('Password must be between 12 and 64 characters')
        .matches(/[A-Z]/).withMessage('Must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Must contain at least one lowercase letter')
        .matches(/\d/).withMessage('Must contain at least one number')
        .matches(/[!@#$%^&*]/).withMessage('Must contain at least one special character'),
    ],
    userControllers.deleteUser
  );

module.exports = router;