const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const errorHandling = require('./errorHandling');

const app = express();
app.use(bodyParser.json());

// Middleware for logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Use routes from the routes.js file
app.use(routes);

// Use error handling middleware from the errorHandling.js file
app.use(errorHandling);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
