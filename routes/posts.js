const express = require('express');
const routes = express.Router();
//Routes
routes.get('/', (req, res) => {
    res.send('We are at post index');
});

module.exports = routes;