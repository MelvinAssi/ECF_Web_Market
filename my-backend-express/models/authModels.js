


const User = require('../entities/User');

exports.findUserByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
    attributes: ['id_user', 'email', 'password', 'role'],
  });
  return user;
};