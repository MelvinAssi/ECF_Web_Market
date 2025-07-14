const transactionModels = require('../models/transactionModels');


exports.getAllTransactionsAdmin = async (req, res) => {
  try {
    const transactions = await transactionModels.getAllTransactions();
    res.json(transactions);
  } catch (err) {
    console.error('getAllTransactionsAdmin error:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
