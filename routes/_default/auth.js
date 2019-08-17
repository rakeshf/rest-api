const express = require('express');
const routes = express.Router();
const User = require('../../models/'+process.env.VERSION+'/User');


routes.post('/register', async (request, response) => {
    const user = new User({
        name: request.body.name,
        email: request.body.email,
        password: passwordHash
    });
    try{
        const savedUser = await user.save();
        response.send({user: _id});
    }catch(err){
        response.status(400).send(err);
    }
});
module.exports = routes;