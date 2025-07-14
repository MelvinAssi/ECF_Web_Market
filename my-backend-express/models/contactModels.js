const db = require('../config/firebase');

exports.createContact = async ({  email, subject, description, category, phone }) => {
  const ref = db.collection('contacts').doc();
  console.log(ref)
  await ref.set({
    email,
    subject,
    description,
    category,
    phone,
    createdAt: new Date().toISOString(),
    isResolved: false,
  });
  return ref.id;
};

exports.getAllContacts = async () => {
  const snapshot = await db.collection('contacts').orderBy('createdAt', 'desc').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

exports.markAsResolved = async (id) => {
  const ref = db.collection('contacts').doc(id);
  const doc = await ref.get();
  if (!doc.exists) throw new Error("Demande introuvable");

  await ref.update({ isResolved: true, resolvedAt: new Date().toISOString() });
};
