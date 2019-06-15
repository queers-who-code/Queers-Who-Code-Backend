/*
This service manages our mongoose connection, events relating to that connection,
and other useful database related methods.
*/

const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI || `mongodb://localhost/${process.env.npm_package_name}`;
const dbOptions = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  useCreateIndex: true,
};

exports.connect = () => {
  mongoose.connect(dbURI, dbOptions);
  mongoose.connection.on('error', error => {
    console.error('\x1b[31m%s\x1b[0m', error.message.substr(error.message.lastIndexOf('['), error.message.length));
  });
  mongoose.connection.on('connected', () => {
    console.log('\x1b[36m%s\x1b[0m', `Mongoose connected URI: ${dbURI}\n`);
  });
  mongoose.connection.on('disconnected', () => {
    console.log('\x1b[31m%s\x1b[0m', `Mongoose disconnected URI: ${dbURI}`);
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      process.exit(0);
    });
  });
  return mongoose.connection;
};

// Verifies that [id] is a valid object id. Returns true or false.
exports.isValidObjectId = id => {
  return mongoose.Types.ObjectId.isValid(id);
};

// Converts [query] to a mongoDB compatible $and query. Returns query object.
exports.queryToAndDbQuery = query => {
  return {
    $and: Object.keys(query).map(k => {
      return { [k]: query[k] };
    }),
  };
};
