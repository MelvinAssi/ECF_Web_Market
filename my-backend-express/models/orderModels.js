const { Order, CartProduct, Cart, OrderProduct, Product, User, Transaction } = require('../entities');
const { v4: uuidv4 } = require('uuid');
const { Sequelize } = require('sequelize');

exports.createOrderFromCart = async (userId) => {
  const cart = await Cart.findOne({ where: { buyer_id: userId }, include: { model: CartProduct } });
  if (!cart || cart.CartProducts.length === 0) throw new Error('Cart is empty');

  const products = await Promise.all(
    cart.CartProducts.map(cp => Product.findByPk(cp.product_id))
  );

  const total = cart.CartProducts.reduce((sum, cp, i) => {
    return sum + cp.quantity * parseFloat(products[i].price);
  }, 0);

  const order = await Order.create({
    id_order: uuidv4(),
    buyer_id: userId,
    total_amount: total,
    status: 'PENDING',
    order_date: new Date()
  });

  await Promise.all(cart.CartProducts.map((cp, i) => {
    return OrderProduct.create({
      order_id: order.id_order,
      product_id: cp.product_id,
      quantity: cp.quantity,
      unit_price: products[i].price
    });
  }));

  await Transaction.create({
    order_id: order.id_order,
    buyer_id: userId,
    amount: total,
    transaction_date: new Date(),
    status: 'PENDING'
  });

  await CartProduct.destroy({ where: { id_cart: cart.id_cart } });

  return order;
};

exports.getOrdersByUser = async (userId) => {
  return await Order.findAll({
    where: { buyer_id: userId },
    include: [
      {
        model: Product,
        as: 'products',
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
        model: Product,
        as: 'products',
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

exports.getAllOrders = async () => {
  return await Order.findAll({
    include: [
      {
        model: Product,
        as: 'products',
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
