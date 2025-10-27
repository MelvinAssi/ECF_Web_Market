const cartModels = require('../models/cartModels');

exports.getCart = async (req, res) => {
    try {
        const cart = await cartModels.getOrCreateCartByUserId(req.user.id);
        const listings = await cartModels.getCartWithListings(cart.id_cart);
        res.json({ cartId: cart.id_cart, listings });
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { listingId, quantity } = req.body;
        const cart = await cartModels.getOrCreateCartByUserId(req.user.id);
        const listing = await cartModels.addListingToCart(cart.id_cart, listingId, quantity);
        res.status(200).json({ message: 'Listing ajouté', listing });
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
exports.getCartQuantity = async (req, res) => {
  try {
    const cart = await cartModels.getOrCreateCartByUserId(req.user.id);
    const cartWithListings = await cartModels.getCartQuantity(cart.id_cart);
    res.status(200).json({ cart: cartWithListings });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }             
};

exports.removeFromCart = async (req, res) => {
    try {
        const { listingId } = req.params;
        const cart = await cartModels.getOrCreateCartByUserId(req.user.id);
        await cartModels.removeListingFromCart(cart.id_cart, listingId);
        res.status(200).json({ message: 'Listing supprimé du panier' });
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
exports.clearCart = async (req, res) => {
  try {
    const cart = await cartModels.getOrCreateCartByUserId(req.user.id);
    await cartModels.clearCart(cart.id_cart);
    res.status(200).json({ message: 'Panier vidé' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors du vidage du panier' });
  }
};
