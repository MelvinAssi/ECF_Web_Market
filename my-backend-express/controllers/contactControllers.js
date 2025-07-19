const contactModels = require('../models/contactModels');
const { validationResult } = require('express-validator');

exports.createContact = async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
  try {
    const data = {
      email: req.body.email,
      subject: req.body.subject,
      description: req.body.description,
      category: req.body.category,
      phone: req.body.phone || '',
    };    
    const id = await contactModels.createContact(data);
    res.status(201).json({ message: 'Demande enregistrée', id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await contactModels.getAllContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.markAsResolved = async (req, res) => {
  console.log("test")
  try {
    await contactModels.markAsResolved(req.params.id);
    res.json({ message: 'Demande marquée comme traitée.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
