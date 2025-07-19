const { validationResult } = require('express-validator');
const Product = require('../entities/Product');
const Listing = require('../entities/Listing');
const User = require('../entities/User');
const productModels = require('../models/productModels');

exports.createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const role = req.user.role;
    const userId = req.user.id;
    const {
      name, description, price, condition, images,
      category_id, verification_status
    } = req.body;

    // Choix du statut selon le rôle
    const status = role === 'ADMIN'
        ? 'ONLINE' 
        : 'PENDING';

    const verification = role === 'ADMIN'
      ? (verification_status || 'READY_TO_SELL')
      : 'UNDER_VERIFICATION';
      
    // Création du produit
    const product = await productModels.createProduct({
      name, description, price, condition, images, category_id, verification_status: verification
    });

    // Création du listing lié
    await Listing.create({
      product_id: product.id_product,
      seller_id: userId,
      status
    });

    res.status(201).json({ message: 'Product and listing created', product });
  } catch (err) {
    console.error('createProduct error:', err);
    res.status(500).json({ error: 'Server error while creating product.' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const role = req.user.role;

    const listing = await productModels.getListingByProductId(id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });

    const isOwner = listing.seller_id === userId;
    if (!isOwner && role !== 'ADMIN') {
      return res.status(403).json({ error: 'Unauthorized to update this product' });
    }

    const updated = await productModels.updateProductById(id, req.body);
    res.json(updated);
  } catch (err) {
    console.error('updateProduct error:', err);
    res.status(500).json({ error: 'Server error while updating product.' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const role = req.user.role;

    const listing = await productModels.getListingByProductId(id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });

    const isOwner = listing.seller_id === userId;
    if (!isOwner && role !== 'ADMIN') {
      return res.status(403).json({ error: 'Unauthorized to delete this product' });
    }

    await productModels.deleteProductById(id);
    await listing.destroy(); 

    res.json({ message: 'Product and listing deleted' });
  } catch (err) {
    console.error('deleteProduct error:', err);
    res.status(500).json({ error: 'Server error while deleting product.' });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModels.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModels.getProductById(id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};