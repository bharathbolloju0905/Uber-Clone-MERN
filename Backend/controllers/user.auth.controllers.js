const userModel = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const blacklistToken = require('../models/blacklist.token');

module.exports.registerController =async (req,res)=>{
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {fullname,email,password} = req.body;
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password,salt);
    try{
        const user = await userModel.create({
            fullname:{
             firstname:fullname.firstname,   
                lastname:fullname.lastname,
            },
            email,
            password:hashedPassword,
            
        });
        user.password = undefined;
        const token =  jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_TIME});
        res.cookie('token',token,{httpOnly:true});
        return res.status(201).json({token,user});

    }catch(errors){
        return res.status(500).json({errors:errors.message});
    }

};

module.exports.loginController = async (req,res)=>{
    const errors = validationResult(req);
   
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email}).select('+password');
        if(!user){
            return res.status(404).json({errors:"User not found"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({errors:"Invalid credentials"});
        }
        user.password = undefined;
        const token =  jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_TIME});
        res.cookie('token',token,{httpOnly:true});
        return res.status(200).json({token,user});

    }catch(errors){
        return res.status(500).json({errors:errors.message});
    }

};
module.exports.profileController = async (req,res)=>{
    return res.status(200).json({user:req.user});
};

module.exports.logoutController = async (req,res)=>{
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    res.clearCookie('token');
    await blacklistToken.create({token});
    return res.status(200).json({message:"Logged out successfully"});
};