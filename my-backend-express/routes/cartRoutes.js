const express = require('express');
const router = express.Router();
const cartControllers = require('../controllers/cartControllers');

const auth = require('../middleware/auth');

router.get('/', auth, cartControllers.getCart);
router.post('/add', auth, cartControllers.addToCart);
router.delete('/remove/:listingId', auth, cartControllers.removeFromCart);
router.delete('/clear', auth, cartControllers.clearCart);

module.exports = router;
