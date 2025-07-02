const User = require('../entities/User');







exports.findUserById = async (id) => {
  const user = await User.findOne({
    where: { id_user:id }
  });
  return user; 
};
exports.updateUserByID = async (id, fieldsToUpdate) => {
    const user = await User.findOne({ where: { id_user: id } });

    if (!user) throw new Error('User not found');

    await user.update(fieldsToUpdate);
    return user;
};
exports.deleteUserByID = async(id) => {
    await User.destroy({
        where: {id_user :id }
    });
}