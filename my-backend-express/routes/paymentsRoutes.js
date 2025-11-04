const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const paymentsControllers = require('../controllers/paymentsControllers');

router.post('/create-checkout-session',auth,   paymentsControllers.createCheckoutSession);
router.post('/webhook', express.raw({ type: 'application/json' }), paymentsControllers.handleStripeWebhook);

module.exports = router;