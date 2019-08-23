const express = require('express');
const routes = express.Router();
const UsersController = require('../../controllers/'+process.env.VERSION+'/UsersController');

routes.post('/register', UsersController.userRegister);

routes.post('/login', UsersController.userLogin);

module.exports = routes;