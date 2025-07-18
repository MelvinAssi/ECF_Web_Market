const Listing = require('../entities/Listing');
const Product = require('../entities/Product');
const User = require('../entities/User');
const Category = require('../entities/Category');

exports.getListingsByStatus = async (status) => {
  return await Listing.findAll({
    where: { status },
    include: [
      {
        model: Product,
        as: 'product',
        include: [
          {
            model: Category,
            as: 'category' 
          }
        ]
      },
      {
        model: User,
        as: 'seller',
        attributes: ['id_user', 'name', 'firstname']
      }
    ]
  });
};

exports.getListingById = async (id) => {
  return await Listing.findOne({
    where: { id_listing: id },
    include: [
      {
        model: Product,
        as: 'product',
                include: [
          {
            model: Category,
            as: 'category' 
          }
        ]
      },
      {
        model: User,
        as: 'seller',
        attributes: ['id_user', 'name', 'firstname']
      }
    ]
  });
};

exports.getListingsBySeller = async (sellerId, filters = {}) => {
  const { status, category_id } = filters;

  return await Listing.findAll({
    where: {
      seller_id: sellerId,
    },
    include: [
      {
        model: Product,
        as: 'product',
        include: [
          {
            model: Category,
            as: 'category' 
          }
        ]
      }
    ]
  });
};


exports.getListingsForAdmin = async ({ status, seller_id, category_id }) => {
  const filters = {};
  if (status) filters.status = status;
  if (seller_id) filters.seller_id = seller_id;

  return await Listing.findAll({
    where: filters,
    include: [
      {
        model: Product,
        as: 'product', 
        where: category_id ? { category_id } : {},
        include: [
          {
            model: Category,
            as: 'category' 
          }
        ]
      },
      {
        model: User,
        as: 'seller',
        attributes: ['id_user', 'name', 'firstname']
      }
    ]
  });
};

exports.updateListingById = async (id, fields) => {
  const listing = await Listing.findByPk(id);
  if (!listing) return null;
  await listing.update(fields);
  return listing;
};

