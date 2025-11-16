const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const paymentsControllers = require('../controllers/paymentsControllers');

router.post('/create-checkout-session',auth,   paymentsControllers.createCheckoutSession);
router.post('/webhook', express.raw({ type: 'application/json' }), paymentsControllers.handleStripeWebhook);
router.post('/create-stripe-seller-account', auth, paymentsControllers.createStripeSellerAccount);
router.post('/success', auth, paymentsControllers.paymentSuccess);
router.post('/cancel', auth, paymentsControllers.paymentCancel);

module.exports = router;