const express = require('express');
const router = express.Router();
const orderControllers = require('../controllers/orderControllers');
const auth = require('../middleware/auth');
const hasRoles = require('../middleware/hasRoles');

router.post('/', auth, orderControllers.createOrderFromCart);

router.get('/me', auth, orderControllers.getMyOrders);

router.get('/admin', auth, hasRoles('ADMIN'), orderControllers.getAllOrdersAdmin);

router.get('/:id', auth, orderControllers.getOrderById);

module.exports = router;
