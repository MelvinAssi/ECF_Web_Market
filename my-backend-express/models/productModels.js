const Product = require('../entities/Product');
const Listing = require('../entities/Listing');
const Category = require('../entities/Category');


exports.createProduct = async (data) => {
  return await Product.create(data);
};

exports.updateProductById = async (id, fields) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  await product.update(fields);
  return product;
};

exports.deleteProductById = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  await product.destroy();
  return true;
};


exports.getListingByProductId = async (productId) => {
  return await Listing.findOne({ where: { product_id: productId } });
};
exports.getAllProducts = async () => {
  return await Product.findAll({
    include: [{ model: Category, as: 'category' }]
  });
};

exports.getProductById= async (id) => {
  const product = await Product.findByPk(id);
  return product;
};
