require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const postsRoute = require('./routes/posts');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/posts', postsRoute);
app.use((req, res, next) => {
    console.log('%s', req);
    next();
});

mongoose.connect(process.env.DB_CONNECTION,
{ useNewUrlParser: true },
() =>{
    console.log('connected to db');
});

/*app.use('/posts', () => {
    console.log('we hit the middleware');
    return true;
});*/

//Routes
app.get('/', (req, res) => {
    res.send('We are no home');
});

// Server listening at port 3000
app.listen(4000);
