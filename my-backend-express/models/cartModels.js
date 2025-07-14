
const CartListing = require('../entities/CartListing')
const { Cart, Listing, Product, User } = require('../entities');

exports.getOrCreateCartByUserId = async (userId) => {
    let cart = await Cart.findOne({ where: { buyer_id: userId } });
    if (!cart) {
        cart = await Cart.create({ buyer_id: userId });
    }
    return cart;
};

exports.addListingToCart = async (cartId, listingId, quantity) => {
    const [cartListing, created] = await CartListing.findOrCreate({
        where: { id_cart: cartId, id_listing: listingId },
        defaults: { quantity }
    });

    if (!created) {
        cartListing.quantity += quantity;
        await cartListing.save();
    }

    return cartListing;
};

exports.getCartWithListings = async (cartId) => {
  return await Cart.findByPk(cartId, {
    include: [
      {
        model: Listing,
        as: 'listings', 
        include: [
          { model: Product, as: 'product' },
          { model: User, as: 'seller' }
        ],
        through: { attributes: ['quantity'] }
      }
    ]
  });
};

exports.removeListingFromCart = async (cartId, listingId) => {
    await CartListing.destroy({ where: { id_cart: cartId, id_listing: listingId } });
};

exports.clearCart = async (cartId) => {
    await CartListing.destroy({ where: { id_cart: cartId } });
};
