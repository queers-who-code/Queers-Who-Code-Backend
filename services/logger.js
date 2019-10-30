/**
 * @file The Logger module that uses Winston to create logs for the server.
 *
 * @module Utils/Logger
 * @requires {@link https://www.npmjs.com/package/winston Winston}
 */

const { createLogger, format, transports } = require('winston');

/**
 * @constant {Winston.logger} Logger The configured logging utility. It is
 * configurable to create new log files based on logging levels as needed.
 */
const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.prettyPrint()),
  transports: [
    // Write to all logs with info level and below to `combined.log`
    // Write all errors to `error.log`
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

/**
 * When not in production, add the Console as a transport layer. Adding
 * the Console makes it easier to debug when trying to track down errors.
 */
if (process.env.NODE_ENV !== 'production' || process.env.NODE_ENV !== 'test') {
  logger.add(
    new transports.Console({
      format: format.simple(),
    }),
  );
}

module.exports = logger;
