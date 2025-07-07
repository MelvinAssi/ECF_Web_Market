const cartModels = require('../models/cartModels');

exports.getCart = async (req, res) => {
    try {
        const cart = await cartModels.getOrCreateCartByUserId(req.user.id);
        const products = await cartModels.getCartWithProducts(cart.id_cart);
        res.json({ cartId: cart.id_cart, products });
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await cartModels.getOrCreateCartByUserId(req.user.id);
        const product = await cartModels.addProductToCart(cart.id_cart, productId, quantity);
        res.status(200).json({ message: 'Produit ajouté', product });
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const cart = await cartModels.getOrCreateCartByUserId(req.user.id);
        await cartModels.removeProductFromCart(cart.id_cart, productId);
        res.status(200).json({ message: 'Produit supprimé du panier' });
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
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
