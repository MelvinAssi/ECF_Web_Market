const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const Category = require('./Category');
const Listing = require('./Listing');
const Cart = require('./Cart');
const CartListing = require('./CartListing');
const Transaction = require('./Transaction');
const OrderListing = require('./OrderListing');

// USER ↔ ORDER
User.hasMany(Order, { foreignKey: 'buyer_id', onDelete: 'CASCADE', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'buyer_id', as: 'buyer' });

// USER ↔ LISTING
User.hasMany(Listing, { foreignKey: 'seller_id', onDelete: 'CASCADE' });
Listing.belongsTo(User, { foreignKey: 'seller_id', as: 'seller' });

// PRODUCT ↔ LISTING
Product.hasMany(Listing, { foreignKey: 'product_id', onDelete: 'CASCADE' });
Listing.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// CATEGORY ↔ PRODUCT
Category.hasMany(Product, { foreignKey: 'category_id', onDelete: 'RESTRICT' });
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

// USER ↔ CART
User.hasOne(Cart, { foreignKey: 'buyer_id', onDelete: 'CASCADE' });
Cart.belongsTo(User, { foreignKey: 'buyer_id' });

// CART ↔ LISTING (Many-to-Many)
Cart.belongsToMany(Listing, {
  through: CartListing,
  foreignKey: 'id_cart',
  otherKey: 'id_listing',
  as: 'listings',
});
Listing.belongsToMany(Cart, {
  through: CartListing,
  foreignKey: 'id_listing',
  otherKey: 'id_cart',
  as: 'carts',
});

// CART ↔ CARTLISTING (One-to-Many)
Cart.hasMany(CartListing, { foreignKey: 'id_cart' });
CartListing.belongsTo(Cart, { foreignKey: 'id_cart' });

Listing.hasMany(CartListing, { foreignKey: 'id_listing' });
CartListing.belongsTo(Listing, { foreignKey: 'id_listing' });

// ORDER ↔ TRANSACTION
Order.hasOne(Transaction, { foreignKey: 'order_id', as: 'transaction', onDelete: 'CASCADE' });
Transaction.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

// USER ↔ TRANSACTION
User.hasMany(Transaction, { foreignKey: 'buyer_id', as: 'transactions' });
Transaction.belongsTo(User, { foreignKey: 'buyer_id', as: 'transactionBuyer' }); // Renommé ici

// ORDER ↔ LISTING (Many-to-Many)
Order.belongsToMany(Listing, {
  through: OrderListing,
  foreignKey: 'order_id',
  otherKey: 'listing_id',
  as: 'listings',
});
Listing.belongsToMany(Order, {
  through: OrderListing,
  foreignKey: 'listing_id',
  otherKey: 'order_id',
  as: 'orders',
});

// ORDER ↔ ORDERLISTING (One-to-Many)
Order.hasMany(OrderListing, { foreignKey: 'order_id' });
OrderListing.belongsTo(Order, { foreignKey: 'order_id' });

Listing.hasMany(OrderListing, { foreignKey: 'listing_id' });
OrderListing.belongsTo(Listing, { foreignKey: 'listing_id' });

module.exports = {
  User,
  Product,
  Order,
  Category,
  Listing,
  Cart,
  CartListing,
  Transaction,
  OrderListing,
};
