
const User = require('../entities/User');

exports.findUserByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
    attributes: ['id_user', 'email', 'password', 'role'],
  });
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
  });
  return user;
};