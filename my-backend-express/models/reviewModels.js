const admin = require('firebase-admin');
const db = require("../config/firebase");
const {User} = require("../entities")

exports.createReview = async (userId, text, star) => {
  await db.collection('reviews').doc(userId).set({
    userId,
    text,
    star,
    createdAt: new Date().toISOString(),
  });
};

exports.updateReview = async (userId, data) => {
  const ref = db.collection('reviews').doc(userId);
  const doc = await ref.get();
  if (!doc.exists) throw new Error("Review not found");
  await ref.update({ ...data, updatedAt: new Date().toISOString() });
};

exports.deleteReview = async (userId) => {
  await db.collection('reviews').doc(userId).delete();
};

exports.getReviewByUser = async (userId) => {
  const doc = await db.collection('reviews').doc(userId).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
};

exports.getAllReviews = async () => {
  const snapshot = await db.collection('reviews').orderBy('createdAt', 'desc').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

exports.getUserById = async(id) =>{
    return await User.findByPk(id, {
        attributes: ['name', 'firstname'],
      });
};