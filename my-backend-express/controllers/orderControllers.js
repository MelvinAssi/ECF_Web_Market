const orderModels = require('../models/orderModels');

exports.createOrderFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const order = await orderModels.createOrderFromCart(userId);
    res.status(201).json(order);
  } catch (err) {
    console.error('createOrderFromCart error:', err);
    res.status(500).json({ error: 'Failed to create order from cart' });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await orderModels.getOrdersByUser(userId);
    res.json(orders);
  } catch (err) {
    console.error('getMyOrders error:', err);
    res.status(500).json({ error: 'Failed to fetch your orders' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await orderModels.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    console.error('getOrderById error:', err);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

exports.getAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await orderModels.getAllOrders();
    res.json(orders);
  } catch (err) {
    console.error('getAllOrdersAdmin error:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
