const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const userModels = require('../models/userModels');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModels.findAllUsers();
    const safeUsers = users.map(u => sanitizeUser(u.dataValues));
    res.json(safeUsers);
  } catch (error) {
    console.error('getAllUsers error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
exports.getUser = async (req, res) => {
  try {
    const id = req.params.id
    if (!id || id === 'null') {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const user = await userModels.findUserById(id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const safeUser = sanitizeUser(user.dataValues);
    res.json(safeUser);
  } catch (error) {
    console.error('getUser error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
 exports.updateUser = async(req,res) => {
    
    try{
        const id = req.params.id 
        const { role,is_active } = req.body;
        console.log(id,role,is_active)
        const updatedUser = await userModels.updateUserAdmin(id,role, is_active);
        const safeUser = sanitizeUser(updatedUser.dataValues);

        res.json({
            message: 'User updated successfully',
            user: safeUser,
          });

    }catch (error){
        res.status(500).json({ message: 'Erreur serveur ='+error });
    }
    

 }

exports.fetchUserData = async (req, res) => {
    try{
        const id = req.user.id;
        const user = await userModels.findUserById(id)
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const safeUser = sanitizeUser(user.dataValues)
        res.json({
            message: 'Profil found with succes',
            user : safeUser,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

 exports.updateUserData = async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }

    
    try{
        const id = req.user.id; 
        const { password, newPassword,newName,newFirstname,newAdress,newPhone,newRole } = req.body;
        
        const user = await userModels.findUserById(id);
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Password error' });
        }
        let hashedPassword = null;
        if(newPassword){
            hashedPassword = await argon2.hash(newPassword);
        }
        
        const updatedFields = {
            password: hashedPassword|| user.password,
            name: newName  || user.name,
            firstname: newFirstname || user.firstname,
            adress: newAdress|| user.adress,
            phone: newPhone  || user.phone,
            role: newRole==true?'SELLER':user.role,
        };
        console.log(updatedFields)
        const updatedUser = await userModels.updateUserByID(id,updatedFields );
        const safeUser = sanitizeUser(updatedUser.dataValues);
        console.log(safeUser)
        res.json({
            message: 'User updated successfully',
            user: safeUser,
          });

    }catch (error){
        res.status(500).json({ message: 'Erreur serveur ='+error });
    }
    

 }

exports.deleteUser = async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }
    try{
        
        const { password} = req.body;        
        const id = req.user.id; 
        const user = await userModels.findUserById(id);
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Password error' });
        }


        await userModels.deleteUserByID(id);
        res.json({
            message: 'Account delete with succes',
        });
    }catch (error){
        res.status(500).json({ message: 'Erreur serveur ='+error });
    }
}

function sanitizeUser(userData) {
    const {password,...safeUser} = userData;
    return safeUser ;
}