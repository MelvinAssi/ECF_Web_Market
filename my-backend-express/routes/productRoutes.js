const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productControllers');
const auth = require('../middleware/auth');
const hasRoles = require('../middleware/hasRoles');
const { body } = require('express-validator');


router.post(  '/',  auth,  hasRoles('ADMIN', 'SELLER'),
  [
    body('name')
      .isLength({ min: 2, max: 64 }).withMessage('Name must be between 2 and 64 characters'),
    body('description')
      .notEmpty().withMessage('Description is required'),
    body('price')
      .notEmpty().withMessage('Price is required')
      .isFloat({ min: 0 }).withMessage('Price must be a valid number'),
    body('condition')
      .isIn(['NEW', 'GOOD', 'USED']).withMessage('Condition must be NEW, GOOD or USED'),
    body('images')
      .isArray({ min: 1 }).withMessage('At least one image is required'),
    body('category_id')
      .notEmpty().withMessage('Category ID is required')
      .isUUID().withMessage('Must be a valid UUID'),
    body('verification_status')
      .optional({ checkFalsy: true })
      .isIn(['UNDER_VERIFICATION', 'RECONDITIONED', 'READY_TO_SELL', 'REJECTED'])
  ],
  productControllers.createProduct
);


router.put('/:id',  auth,  hasRoles('ADMIN', 'SELLER'),  productControllers.updateProduct);


router.delete('/:id',  auth,  hasRoles('ADMIN', 'SELLER'),  productControllers.deleteProduct
);
router.get('/', auth, hasRoles('ADMIN'), productControllers.getAllProducts);
router.get('/:id', auth, hasRoles('ADMIN'), productControllers.getProduct);
module.exports = router;
