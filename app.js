require('dotenv/config');

const express = require('express');
const mongoose = require('mongoose');
const postsRoute = require('./routes/'+process.env.VERSION+'/posts');
const authRoute = require('./routes/'+process.env.VERSION+'/auth');
const bodyParser = require('body-parser');
const cors = require('cors');
const authConfig = require('./config/'+process.env.VERSION+'/auth-config');
const { Authentication, APIkeyValidation } = require('./middleware/'+process.env.VERSION+'/authentication');
const redis = require('redis');
const app = express();
const auth = new Authentication({ routes: authConfig });
const authApiKey = new APIkeyValidation({ apiKey: process.env.API_KEY });

// Caching
client = redis.createClient({
    port: 6379,
    host: 'SG-comments-24632.servers.mongodirector.com', 
    password: process.env.'WQU3MDVjDMqqLx2FAXf6Uu6wqIsR3w9u'
});
client.on('connect', function() {
    console.log('Redis client connected');
});
client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

client.set('framework', 'AngularJS', function(err, reply) {
    console.log(reply);
});

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(authApiKey.filter());
app.use(auth.filter());
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
