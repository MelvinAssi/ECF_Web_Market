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

exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await transactionModels.updateTransactionById(id, req.body);
    res.json(updated);
  } catch (err) {
    console.error('updateProduct error:', err);
    res.status(500).json({ error: 'Server error while updating transaction.' });
  }
};