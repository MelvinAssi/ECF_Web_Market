const express = require('express');
const router = express.Router();
const contactControllers = require('../controllers/contactControllers');
const auth = require('../middleware/auth');
const hasRoles = require('../middleware/hasRoles');
const { body } = require('express-validator');


router.post(
  '/',
  [
    body('email').isEmail().withMessage('Email invalide'),
    body('subject').isLength({ min: 2, max: 64 }).withMessage('Sujet invalide'),
    body('description').isLength({ min: 2, max: 512 }).withMessage('Description invalide'),
    body('category').isString().withMessage('Catégorie requise'),
  ],
  contactControllers.createContact
);

router.get(
  '/',
  auth,
  hasRoles('ADMIN'),
  contactControllers.getAllContacts
);

router.patch(
  '/:id',
  auth,
  hasRoles('ADMIN'),
  contactControllers.markAsResolved
);

module.exports = router;
