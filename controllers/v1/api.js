// bring in express routing only
const app = require('express').Router();

// index api route (test)
app.get('/', (req, res, next) => {
  res.json({ message: 'Welcome to the api!' });
});

// export routes
module.exports = app;
