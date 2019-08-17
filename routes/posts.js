const express = require('express');
const routes = express.Router();
const Post = require('../models/Post');

//Routes
routes.get('/', async (request, response) => {
    try{
        const posts = await Post.find(); 
        response.json(posts);
    }catch(err){
        response.json({message: err});
    }
});

routes.post('/', async (request, response) => {
    const post = new Post({
        title: request.body.title,
        description: request.body.description,
        status: request.body.status
    });
    try{
        const postSaved = await post.save();
        response.json(postSaved);
    }catch(err){
        response.json({message: err});
    }
});

module.exports = routes;