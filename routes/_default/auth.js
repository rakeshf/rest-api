const express = require('express');
const routes = express.Router();
const User = require('../../models/'+process.env.VERSION+'/User');
const { registerValidation } = require('../../helpers/_default/validate');
const bcrypt = require('bcryptjs');

routes.post('/register', async (request, response) => {
    // Validate the user input
    const { error } = registerValidation(request.body);
    if(error) return response.status(400).send(error.details[0].message);
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
module.exports = routes;