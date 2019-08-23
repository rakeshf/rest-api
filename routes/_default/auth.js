const express = require('express');
const routes = express.Router();
const users_controller = require('../../controllers/'+process.env.VERSION+'/UsersController');

routes.post('/register', users_controller.userRegister);

routes.post('/login', users_controller.userLogin);

module.exports = routes;