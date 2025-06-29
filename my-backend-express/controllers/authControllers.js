const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const authModels = require('../models/authModels');



exports.emailVerified = async(req,res)=>{
    try{
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg });
        }
        const {email}=req.body
        
        const user = await authModels.findUserByEmail(email)
        if(! user){
            return res.status(400).json({ error: 'Account not found' });
        }

        res.status(201).json({
            message: "Account found" ,
            user: {
              email: user.email
            }          
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Erreur serveur' });
    }
}


exports.signinUser =async (req, res) => {
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
    
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
        return res.status(400).json({ error: 'Password error' });
    } 


    const token = jwt.sign(
        {
        id: user.id,
        email: user.email,
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
    
    res.status(201).json({
        message: "Connexion succes" ,
        user: {
        email: user.email,
        }
    });


    } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
    }
}