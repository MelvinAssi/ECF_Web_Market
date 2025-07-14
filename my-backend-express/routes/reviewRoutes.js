const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const hasRoles = require('../middleware/hasRoles');
const { body } = require('express-validator');
const reviewControllers = require('../controllers/reviewControllers');


router.post(
  '/',
  auth,
  [
    body('text').notEmpty().isLength({ min: 2, max: 200 }),
    body('star').notEmpty().isInt({ min: 1, max: 5 }),
  ],
  reviewControllers.createReview
);

router.put(
  '/',
  auth,
  [
    body('text').optional().isLength({ min: 2, max: 200 }),
    body('star').optional().isInt({ min: 1, max: 5 }),
  ],
  reviewControllers.updateReview
);

router.delete('/', auth, reviewControllers.deleteReview);
router.get('/me', auth, reviewControllers.getMyReview);
router.get('/', reviewControllers.getAllReviews);


router.delete('/:userId', auth, hasRoles('ADMIN'), reviewControllers.adminDeleteReview);

module.exports = router;
