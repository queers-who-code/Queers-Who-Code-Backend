// bring in express routing only
const app = require('express').Router();

app.get('/', (req, res, next) => {
  res.json({ message: 'Welcome to the api!' });
});

// export routes
module.exports = app;
