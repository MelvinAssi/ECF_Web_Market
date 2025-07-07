const Cart = require('../entities/Cart');
const CartProduct = require('../entities/CartProduct');

exports.getOrCreateCartByUserId = async (userId) => {
    let cart = await Cart.findOne({ where: { buyer_id: userId } });
    if (!cart) {
        cart = await Cart.create({ buyer_id: userId });
    }
    return cart;
};

exports.addProductToCart = async (cartId, productId, quantity) => {
    const [cartProduct, created] = await CartProduct.findOrCreate({
        where: { id_cart: cartId, id_product: productId },
        defaults: { quantity }
    });

    if (!created) {
        cartProduct.quantity += quantity;
        await cartProduct.save();
    }

    return cartProduct;
};

exports.getCartWithProducts = async (cartId) => {
    return await CartProduct.findAll({ where: { id_cart: cartId } });
};

exports.removeProductFromCart = async (cartId, productId) => {
    await CartProduct.destroy({ where: { id_cart: cartId, id_product: productId } });
};

exports.clearCart = async (cartId) => {
    await CartProduct.destroy({ where: { id_cart: cartId } });
};
