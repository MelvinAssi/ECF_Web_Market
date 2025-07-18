
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
    role: 'SELLER',
    last_activity:Date.now(),
  });
  return user;
};