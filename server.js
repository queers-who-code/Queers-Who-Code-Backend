require('dotenv').config();
const express = require('express');

const app = express(); // export express app
const helmet = require('helmet');
const { handlers, rateLimiter } = require('./middlewares');
// const { db } = require('./services');
const v1Controllers = require('./controllers/v1');

// port server will run on
const port = process.env.PORT || 5000;

// connect to mongodb
// db.connect();

// Configure express to use json
app.use(express.json());

// setup express to use helmet middleware
app.use(helmet());

// Apply our rate limiter middleware to all routes
app.use(rateLimiter);

// register our v1 api controllers with the server
Object.values(v1Controllers).forEach(controller => {
  app.use('/api/v1', controller);
});

// If no routes found then send to notFoundHandler
app.use(handlers.notFound);

// All errors will be sent here and displayed to the user in json format
app.use(handlers.error);

// start server
app.listen(port, () => {
  console.log('\x1b[35m%s\x1b[0m', `\nExpress listening for requests on PORT ${port}\n`);
});

// Export our express server to be used for tests
module.exports = app;
