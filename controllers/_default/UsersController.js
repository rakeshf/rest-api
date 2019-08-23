const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/'+process.env.VERSION+'/User');
const { registerValidation, loginValidation } = require('../../helpers/'+process.env.VERSION+'/validate');

exports.userLogin = async (req, res, next) => {
  try {
    // Validate the user input
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
        
    // Check user exist
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email Exists');
        
    // Password correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid Password');
        
    // Create and assing token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
  } catch(err) {
    console.log(err); // up to you what to do with the error
    next();
  }
};


exports.userRegister = async (req, res, next) => {
  try {
    // Validate the user input
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send();
    // Check user exist
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email Exists');

    // HashPassword
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword
    });

    try{
      const savedUser = await user.save();
      res.send({user: user._id});
    }catch(err){
      res.status(400).send(err);
    }
  } catch(err) {
    console.log(err); // up to you what to do with the error
    next();
  }
};