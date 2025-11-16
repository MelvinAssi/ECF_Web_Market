const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const authModels = require('../models/authModels');
const { verifyGoogleToken } = require('../middleware/verifyGoogleToken');

// Vérifie si un email existe déjà
exports.checkEmailExistence = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array()[0].msg });

    const { email } = req.body;
    const user = await authModels.findUserByEmail(email);
    res.status(200).json({ exists: !!user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Connexion utilisateur
exports.signInUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array()[0].msg });

    const { email, password } = req.body;
    const user = await authModels.findUserByEmail(email);

    if (!user) return res.status(400).json({ error: 'Email error' });
    if (!user.is_active) return res.status(400).json({ error: 'Account disabled' });

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) return res.status(400).json({ error: 'Password error' });

    return handleAuthSuccess(res, user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Vérifie si un email est disponible
exports.checkEmailAvailability = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array()[0].msg });

    const { email } = req.body;
    const user = await authModels.findUserByEmail(email);
    res.status(200).json({ available: !user });
  } catch (err) {
    console.error('Erreur dans checkEmailAvailability :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Inscription utilisateur
exports.signUpUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array()[0].msg });

    const { email, password, name, firstname, adress, phone } = req.body;
    const existingUser = await authModels.findUserByEmail(email);
    if (existingUser) return res.status(400).json({ error: 'Email already in use' });

    const hash = await argon2.hash(password);
    const newUser = await authModels.createUser(email, hash, name, firstname, adress, phone);

    return handleAuthSuccess(res, newUser, true);
  } catch (err) {
    console.error('Erreur dans signUpUser :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Auth Google
exports.authWithGoogle = async (req, res) => {
  try {
    const { token } = req.body;
    const payload = await verifyGoogleToken(token);
    const { sub: googleId, email, given_name, family_name } = payload;

    const { user,isNew } = await handleOAuth({
      provider: 'google',
      providerId: googleId,
      email,
      info: { name: family_name, firstname: given_name },
    });

    return handleAuthSuccess(res, user,isNew);
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Erreur authentification Google' });
  }
};

async function handleOAuth({ provider, providerId, email, info }) {
  let user = await authModels.findUserByEmail(email);
  let account;
  let isNew = false;

  if (user) {
    account = await authModels.findOauthAccount(provider, providerId);
    if (!account) {
      account = await authModels.createOauthAccount(provider, providerId, email, user.id_user);
    }
  } else {
    user = await authModels.createUserFromGoogle({
      email,
      firstname: info.firstname,
      name: info.name,
    });
    isNew = true;
  }

  return { user, account, isNew };
}

// Déconnexion utilisateur
exports.signOutUser = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });
    res.json({ message: 'Disconnect with success' });
  } catch (err) {
    console.error('Erreur dans signOutUser :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Rafraîchir le token JWT
exports.refreshToken = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'No token provided' }); 

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await authModels.findUserByEmail(decoded.email);
    if (!user) return res.status(401).json({ error: 'User not found' });
    return handleAuthSuccess(res, user);
  } catch (err) {
    console.error('Erreur dans refreshToken :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// Fonctions utilitaires
function sanitizeUser(userData) {
  const { id_user, email, role, name, firstname } = userData;
  return { id_user, email, role, name, firstname };
}

async function handleAuthSuccess(res, user, isNew = false) {
  await authModels.lastConnexion(user.email);

  const token = jwt.sign(
    { id: user.id_user, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 60 * 60 * 1000,
  });

  const safeUser = sanitizeUser(user.dataValues);
  return res.status(isNew ? 201 : 200).json({ success: true, user: safeUser });
}
