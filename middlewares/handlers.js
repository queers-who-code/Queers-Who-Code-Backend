const jwt = require('jsonwebtoken');

// PageNotFound Handler
exports.notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Not Found - ${req.method} ${req.originalUrl}`));
};

// Error Handler
exports.error = (error, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    error: error.message,
  });
};

// Authorization Handler
exports.authorized = (req, res, next) => {
  // check that authorization header is set
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    // verify jwt was sent by this server and decode userid from jwt
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        return next(new Error(`Unauthorized - Invalid signature, please ensure your API key is valid.`));
      }

      // set user id in req and continue
      req.userId = decoded._id;
      return next();
    });
  }

  // return error and 401
  res.status(401);
  return next(new Error(`Unauthorized - No header set, please set authorization header with your API key.`));
};
