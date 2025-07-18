const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const authModels = require('../models/authModels');



exports.checkEmailExistence = async(req,res)=>{
    try{
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg });
        }
        const {email}=req.body
        
        const user = await authModels.findUserByEmail(email)


        return res.status(200).json({ exists: !!user });

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Erreur serveur' });
    }
}


exports.signInUser =async (req, res) => {
    try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { email, password } = req.body;
    
    const user = await authModels.findUserByEmail(email);
    if(!user){
        return res.status(400).json({ error: 'Email error' });
    }
    if(!user.is_active){
        return res.status(400).json({ error: 'Account disable' });
    }
    
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
        return res.status(400).json({ error: 'Password error' });
    } 

    await authModels.lastConnexion(email);


    const token = jwt.sign(
        {
        id: user.id_user,
        email: user.email,
        role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,          
        sameSite: 'None',      
        maxAge: 60 * 60 * 1000,
    });
    
    const safeUser = sanitizeUser(user.dataValues); 
    console.log(safeUser)
    res.status(200).json({ success: true, user: safeUser });


    } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
    }
}

exports.checkEmailAvailability = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    const { email } = req.body;
    const user = await authModels.findUserByEmail(email);
    res.status(200).json({ available: !user });

  } catch (err) {
    console.error('Erreur dans checkEmailAvailability :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.signUpUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    const { email, password, name, firstname, adress, phone } = req.body;
    const user = await authModels.findUserByEmail(email);
    if (user) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    const hash = await argon2.hash(password);
    const newUser = await authModels.createUser(email, hash, name, firstname, adress, phone);
    const token = jwt.sign(
      {
        id: newUser.id_user,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 60 * 60 * 1000,
    });

    
    const safeUser = sanitizeUser(newUser.dataValues); 
    console.log(safeUser)
    res.status(201).json(	{ success: true, user: safeUser });
  } catch (err) {
    console.error('Erreur dans signUpUser :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};


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


function sanitizeUser(userData) {
  const {
    id_user,
    email,
    role
  } = userData;

  return { id_user, email, role };
}