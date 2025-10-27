
const OAuthAccount = require('../entities/OAuthAccount');
const User = require('../entities/User');

exports.findUserByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
    attributes: ['id_user', 'email', 'password', 'role','is_active'],
  });
  return user; 
};
exports.lastConnexion = async (email) => {
  const user = await User.findOne({
    where: { email },
  });
  await user.update({last_activity:Date.now()});
  return user; 
};
exports.createUser = async (email, password, name, firstname, adress, phone) => {
  const user = await User.create({
    email,
    password,
    name,
    firstname,
    adress,
    phone,
    role: 'BUYER',
    last_activity:Date.now(),
  });
  return user;
};

exports.findOauthAccount = async(provider, providerId)=>{
  const account = await OAuthAccount.findOne({
    where: { provider, providerId },
    include:[{model:User, as: 'user' }]
  });
  return account;
}
exports.createOauthAccount = async(provider, providerId,email,id_user)=>{
  const account = await OAuthAccount.create({provider, providerId,email,id_user})
  return account;
}

exports.createUserFromGoogle = async ({ email, firstname, name }) => {
  console.log(email, firstname, name)
  const user = await User.create({
    email,
    firstname,
    name,
    password: null, 
    is_active: true,
  });
  return user;
};
