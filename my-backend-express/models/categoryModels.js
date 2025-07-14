const Category = require('../entities/Category');

exports.getAllCategories = async () => {
  return await Category.findAll();
};

exports.getCategoryByName = async (name) => {
  return await Category.findOne({ where: { name_category: name } });
};
exports.createCategory = async (name) => {
  return await Category.create({ name_category: name });
};

exports.updateCategory = async (id, name) => {
  const category = await Category.findByPk(id);
  if (!category) return null;
  await category.update({ name_category: name });
  return category;
};

exports.deleteCategory = async (id) => {
  const category = await Category.findByPk(id);
  if (!category) return null;
  await category.destroy();
  return category;
};
