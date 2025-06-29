const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const Category = require('./Category');
const Listing = require('./Listing');
const Cart = require('./Cart');
const CartProduct = require('./CartProduct');
const Transaction = require('./Transaction');

// Relations
User.hasMany(Order, { foreignKey: 'buyer_id', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'buyer_id' });

User.hasMany(Listing, { foreignKey: 'seller_id', onDelete: 'CASCADE' });
Listing.belongsTo(User, { foreignKey: 'seller_id' });

Product.hasMany(Listing, { foreignKey: 'product_id', onDelete: 'CASCADE' });
Listing.belongsTo(Product, { foreignKey: 'product_id' });

Category.hasMany(Product, { foreignKey: 'category_id', onDelete: 'RESTRICT' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

User.hasOne(Cart, { foreignKey: 'buyer_id', onDelete: 'CASCADE' });
Cart.belongsTo(User, { foreignKey: 'buyer_id' });

Cart.belongsToMany(Product, { through: CartProduct, foreignKey: 'id_cart', otherKey: 'id_product' });
Product.belongsToMany(Cart, { through: CartProduct, foreignKey: 'id_product', otherKey: 'id_cart' });

Order.hasOne(Transaction, { foreignKey: 'order_id', onDelete: 'CASCADE' });
Transaction.belongsTo(Order, { foreignKey: 'order_id' });

module.exports = { User, Product, Order, Category, Listing, Cart, CartProduct, Transaction };