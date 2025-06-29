
const argon2 = require('argon2');

const generateHashedPassword = async () => {
  try {
    const password = 'AzertyAzerty25&';
    const hashedPassword = await argon2.hash(password);
    console.log('Mot de passe haché :', hashedPassword);
  } catch (err) {
    console.error('Erreur lors du hachage :', err);
  }
};

generateHashedPassword();