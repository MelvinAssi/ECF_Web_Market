const { Order, CartListing, Cart, OrderListing, Listing, User, Transaction,Product } = require('../entities');
const { v4: uuidv4 } = require('uuid');
const { Sequelize } = require('sequelize');

exports.createOrderFromCart = async (userId) => {
  const cart = await Cart.findOne({
    where: { buyer_id: userId },
    include: { model: CartListing }
  });

  if (!cart || cart.CartListings.length === 0)
    throw new Error('Cart is empty');

  // Récupère les listings (pas produits !)
  const listings = await Promise.all(
    cart.CartListings.map(cl => Listing.findByPk(cl.id_listing, {
      include: ['product']
    }))
  );

  const total = cart.CartListings.reduce((sum, cl, i) => {
    return sum + cl.quantity * parseFloat(listings[i].product.price);
  }, 0);

  const order = await Order.create({
    id_order: uuidv4(),
    buyer_id: userId,
    total_amount: total,
    status: 'PENDING',
    order_date: new Date()
  });

  await Promise.all(cart.CartListings.map((cl, i) => {
    return OrderListing.create({
      order_id: order.id_order,
      listing_id: cl.id_listing,
      quantity: cl.quantity,
      unit_price: listings[i].product.price
    });
  }));

  await Transaction.create({
    order_id: order.id_order,
    buyer_id: userId,
    amount: total,
    transaction_date: new Date(),
    status: 'PENDING'
  });

  await CartListing.destroy({ where: { id_cart: cart.id_cart } });

  return order;
};

exports.getOrdersByUser = async (userId) => {
  return await Order.findAll({
    where: { buyer_id: userId },
    include: [
      {
        model: Listing,
        as: 'listings',
        include: ['product'],
        through: { attributes: ['quantity', 'unit_price'] }
      }
    ],
    order: [['order_date', 'DESC']]
  });
};

exports.getOrderById = async (id_order) => {
  return await Order.findByPk(id_order, {
    include: [
      {
        model: Listing,
        as: 'listings',
        include: ['product'],
        through: { attributes: ['quantity', 'unit_price'] }
      },
      {
        model: User,
        as: 'buyer',
        attributes: ['id_user', 'name', 'firstname']
      }
    ]
  });
};
exports.updateOrderById = async (id_order, status) => {
  const order = await Order.findByPk(id_order); 

  if (!order) throw new Error('Order not found');

  await order.update({ status }); 
  return order;
};
exports.getAllOrders = async () => {
  return await Order.findAll({
    include: [
      {
        model: Listing,
        as: 'listings',
        include: [
          {
            model: Product,
            as: 'product',
          }
        ],
        through: { attributes: ['quantity', 'unit_price'] }
      },
      {
        model: User,
        as: 'buyer',
        attributes: ['id_user', 'name', 'firstname']
      }
    ],
    order: [['order_date', 'DESC']]
  });
};
