const express = require('express');

const app = express();

//Routes
app.get('/', (req, res) => {
    res.send('Hello from express');
});

// Server listening at port 3000
app.listen(3000);
