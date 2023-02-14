const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// validation
const Joi = require('@hapi/joi');
const {registarValidation, loginValidation} = require('../validation');


const schema = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string().min(6).email().required(),
  password: Joi.string().min(6).required(),

 
}).unknown(true);



router.post('/register', async (req, res) => {
  // Validate data
  
  const {error} = registarValidation(req.body);
  if(error) return res.status(400).send(error.details); 
 
  //Checking if the user is already in the database
  const usernameExist = await User.findOne({username: req.body.username});
  if(usernameExist) return res.status(400).send("Username already exists.");


  //Has passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    username: req.body.username,
    container: req.body.container,
    password: hashedPassword,
    
  })
  try {
    const savedUser = await user.save();
    res.send({user: user._id});
  } catch(err) {
    res.status(400).send(err);
  }
});

//LOGIN
router.post('/login', async (req,res) => {
  const {error} = loginValidation(req.body);
  if(error) return res.status(400).json({message:error.details[0].message});

  // check if email exists
  const user = await User.findOne({username: req.body.username});
  if(!user) return res.status(400).json({message:"Username or password is wrong"});
  
  //PASSWORD IS CORRECT
 const validPass = await bcrypt.compare(req.body.password, user.password);
 if(!validPass) return res.status(400).json({message:'Username or password is wrong'});


 // Create and assign a token
 const options = { expiresIn: '1h' };
 const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, options);
 res.header('auth-token', token).json({message: "Successfuly logged in",SessionToken: token, container: user.container});
 console.log(token);
})



module.exports = router;
