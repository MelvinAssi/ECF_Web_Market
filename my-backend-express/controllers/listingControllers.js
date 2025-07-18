const listingModels = require('../models/listingModels.js');
const { isUUID } = require('validator');

exports.getPublicListings = async (req, res) => {
  try {
    const listings = await listingModels.getListingsByStatus('ONLINE');
    res.json(listings);
  } catch (err) {
    console.error('getPublicListings error:', err);
    res.status(500).json({ error: 'Error fetching public listings' });
  }
};

exports.getListingById = async (req, res) => {
  try {
    console.log(req.params.id)
    if (!isUUID(req.params.id)) return res.status(400).json({ error: 'Invalid ID' });
    const listing = await listingModels.getListingById(req.params.id);
    if (!listing || listing.status !== 'ONLINE') {
      return res.status(404).json({ error: 'Listing not found' });
    }
    res.json(listing);
  } catch (err) {
    console.error('getListingById error:', err);
    res.status(500).json({ error: 'Error fetching listing' });
  }
};

exports.getMyListings = async (req, res) => {
  try {
    const listings = await listingModels.getListingsBySeller(req.user.id, req.query);
    res.json(listings);
  } catch (err) {
    console.error('getMyListings error:', err);
    res.status(500).json({ error: 'Error fetching your listings' });
  }
};


exports.getAllListingsForAdmin = async (req, res) => {
  try {
    console.log(req.query)
    const listings = await listingModels.getListingsForAdmin(req.query);
    res.json(listings);
  } catch (err) {
    console.error('getAllListingsForAdmin error:', err);
    res.status(500).json({ error: 'Error fetching admin listings' });
  }
};

exports.updateListing = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await listingModels.updateListingById(id, req.body);
    res.json(updated);
  } catch (err) {
    console.error('updateProduct error:', err);
    res.status(500).json({ error: 'Server error while updating listing.' });
  }
};
