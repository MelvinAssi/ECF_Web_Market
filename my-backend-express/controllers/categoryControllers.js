const categoryModels = require('../models/categoryModels');
const { validationResult } = require('express-validator');


exports.getCategories = async (req, res) => {
  try {
    const categories = await categoryModels.getAllCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
exports.getCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    const { name } = req.params;
    const category = await categoryModels.getCategoryByName(name);
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    const { name_category } = req.body;
    const newCategory = await categoryModels.createCategory(name_category);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }    
    const { id } = req.params;
    const { name_category } = req.body;
    const updated = await categoryModels.updateCategory(id, name_category);
    if (!updated) return res.status(404).json({ error: 'Catégorie non trouvée' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await categoryModels.deleteCategory(id);
    if (!deleted) return res.status(404).json({ error: 'Catégorie non trouvée' });
    res.json({ message: 'Catégorie supprimée' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
