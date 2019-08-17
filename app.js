require('dotenv/config');

const express = require('express');
const mongoose = require('mongoose');
const postsRoute = require('./routes/'+process.env.VERSION+'/posts');
const authRoute = require('./routes/'+process.env.VERSION+'/auth');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/api/'+process.env.VERSION+'/posts', postsRoute);
app.use('/api/'+process.env.VERSION+'/user', authRoute);

mongoose.connect(process.env.DB_CONNECTION,
{ useNewUrlParser: true },
() =>{
    console.log('connected to db');
});

//Routes
app.get('/', (req, res) => {
    res.send('We are no home');
});

// Server listening at port 3000
app.listen(process.env.PORT);
