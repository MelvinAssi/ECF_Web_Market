const express = require('express');
const router = express.Router();
const categoryControllers = require('../controllers/categoryControllers');
const auth = require('../middleware/auth');
const hasRoles = require('../middleware/hasRoles');
const { body } = require('express-validator');

router.get('/', auth, categoryControllers.getCategories); 
router.post('/', auth, hasRoles('ADMIN'),
  [
    body('name_category')
      .trim()
      .notEmpty().withMessage('Le nom est requis')
      .isLength({ min: 2, max: 64 }).withMessage('Le nom doit faire entre 2 et 64 caractères'),
  ], categoryControllers.createCategory);
router.put('/:id', auth, hasRoles('ADMIN'),
  [
    body('name_category')
      .trim()
      .notEmpty().withMessage('Le nom est requis')
      .isLength({ min: 2, max: 64 }).withMessage('Le nom doit faire entre 2 et 64 caractères'),
  ], categoryControllers.updateCategory);
router.delete('/:id', auth, hasRoles('ADMIN'), categoryControllers.deleteCategory);

module.exports = router;