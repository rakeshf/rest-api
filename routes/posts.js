const express = require('express');
const routes = express.Router();
const Post = require('../models/Post');

//Routes
routes.get('/', (req, res) => {
    res.send('We are at post index');
});

routes.post('/', async (request, response) => {
    const post = new Post({
        title: request.body.title,
        description: request.body.description
    });
    try{
        const postSaved = await post.save();
        response.json(postSaved);
    }catch(err){
        response.json({message: err});
    }
});

module.exports = routes;