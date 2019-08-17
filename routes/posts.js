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

// Get post
routes.get('/:postId', async (request, response) => {
    try{
        const post = await Post.findById(request.params.postId); 
        response.json(post);
    }catch(err){
        response.json({message: err});
    }
});

// Delete
routes.delete('/:postId', async (request, response) => {
    try{
        console.log('Delete post ID = '+request.params.postId);
        const removedPost = await Post.deleteOne({_id: request.params.postId}); 
        response.json(removedPost);
    }catch(err){
        response.json({message: err});
    }
});

// Update
routes.patch('/:postId', async (request, response) => {
    try{
        console.log('Update post ID = '+request.params.postId);
        const updatePost = await Post.updateOne({ _id: request.params.postId }, 
            { $set: { title:request.body.title } }); 
        response.json(updatePost);
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