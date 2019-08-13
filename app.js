require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const postsRoute = require('./routes/posts');

const app = express();

app.use('/posts', postsRoute);

mongoose.connect(process.env.DB_CONNECTION, 
{ useNewUrlParser: true },
() =>{
    console.log('connected to db');
});
//Middlewares
/*app.use('/posts', () => {
    console.log('we hit the middleware');
    return true;
});*/

//Routes
app.get('/', (req, res) => {
    res.send('We are no home');
});

// Server listening at port 3000
app.listen(3000);
