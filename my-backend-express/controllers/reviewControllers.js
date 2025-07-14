const reviewModels = require('../models/reviewModels');
const { validationResult } = require('express-validator');

exports.createReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { text, star } = req.body;
  const userId = req.user.id;

  try {
    await reviewModels.createReview(userId, text, star);
    res.status(201).json({ message: 'Avis enregistré avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateReview = async (req, res) => {
  const userId = req.user.id;
  try {
    await reviewModels.updateReview(userId, req.body);
    res.json({ message: 'Avis mis à jour' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  const userId = req.user.id;
  try {
    await reviewModels.deleteReview(userId);
    res.json({ message: 'Avis supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyReview = async (req, res) => {
  const userId = req.user.id;
  try {
    const review = await reviewModels.getReviewByUser(userId);
    if (!review) return res.status(404).json({ message: "Aucun avis trouvé" });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModels.getAllReviews();

    const enrichedReviews = await Promise.all(
      reviews.map(async (review) => {
        const user = await reviewModels.getUserById(review.userId);

        return {
          ...review,
          user: {
            name: user?.name || 'Inconnu',
            firstname: user?.firstname || '',
          },
        };
      })
    );

    res.json(enrichedReviews);
  } catch (err) {
    console.error('getAllReviews error:', err);
    res.status(500).json({ error: err.message });
  }
};


exports.adminDeleteReview = async (req, res) => {
  const { userId } = req.params;
  try {
    await reviewModels.deleteReview(userId);
    res.json({ message: "Avis supprimé par l'admin" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
