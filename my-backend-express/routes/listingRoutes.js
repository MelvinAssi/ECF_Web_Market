const express = require('express');
const router = express.Router();
const listingControllers = require('../controllers/listingControllers');
const auth = require('../middleware/auth');
const hasRoles = require('../middleware/hasRoles');

router.get('/', listingControllers.getPublicListings);

router.get('/user', auth, hasRoles('SELLER'), listingControllers.getMyListings);

router.get('/admin', auth, hasRoles('ADMIN'), listingControllers.getAllListingsForAdmin);

router.get('/:id', listingControllers.getListingById);
router.put('/:id',  auth,  hasRoles('ADMIN'),  listingControllers.updateListing);

module.exports = router;
