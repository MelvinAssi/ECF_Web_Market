const {
  Order,
  Listing,
  User,
  Transaction
} = require('../entities');

exports.getAllTransactions = async () => {
  return await Transaction.findAll({
    include: [
      {
        model: Order,
        as: 'order', // <- alias défini dans index.js
        include: [
          {
            model: Listing,
            as: 'listings',
            include: [
              {
                association: 'product', // <- alias du product dans listing
              }
            ],
            through: { attributes: ['quantity', 'unit_price'] }
          }
        ]
      },
      {
        model: User,
        as: 'transactionBuyer', // <- alias corrigé pour éviter le conflit
        attributes: ['id_user', 'name', 'firstname']
      }
    ],
    order: [['transaction_date', 'DESC']]
  });
};

exports.updateTransactionById = async (id, fields) => {
  const transaction = await Transaction.findByPk(id);
  if (!transaction) return null;
  await transaction.update(fields);
  return transaction;
};