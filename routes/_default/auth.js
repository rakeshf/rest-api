const express = require('express');
const routes = express.Router();

routes.post('/register', (request, response) => {
    console.log('hello from register');
});

module.exports = routes;