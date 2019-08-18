const express = require('express');
const routes = express.Router();
const User = require('../../models/'+process.env.VERSION+'/User');
const { registerValidation, loginValidation } = require('../../helpers/'+process.env.VERSION+'/validate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

routes.post('/register', async (request, response) => {
    // Validate the user input
    const { error } = registerValidation(request.body);
    if(error) return response.status(400).send( );
    // Check user exist
    const emailExist = await User.findOne({email: request.body.email});
    if(emailExist) return response.status(400).send('Email Exists');

    // HashPassword
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(request.body.password, salt);

    const user = new User({
        name: request.body.name,
        email: request.body.email,
        password: hashPassword
    });
    try{
        const savedUser = await user.save();
        response.send({user: user._id});
    }catch(err){
        response.status(400).send(err);
    }
});

routes.post('/login', async (request, response) => {
    // Validate the user input
    const { error } = loginValidation(request.body);
    if(error) return response.status(400).send(error.details[0].message);

    // Check user exist
    const user = await User.findOne({email: request.body.email});
    if(!user) return response.status(400).send('Email Exists');

    // Password correct
    const validPassword = await bcrypt.compare(request.body.password, user.password);
    if(!validPassword) return response.status(400).send('Invalid Password');

    // Create and assing token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    response.header('auth-token', token).send(token);
});

module.exports = routes;