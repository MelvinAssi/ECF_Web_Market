const express = require('express');
const router = express.Router();
const transactionControllers = require('../controllers/transactionControllers');
const auth = require('../middleware/auth');
const hasRoles = require('../middleware/hasRoles');

router.get('/admin', auth, hasRoles('ADMIN'), transactionControllers.getAllTransactionsAdmin);

module.exports = router;