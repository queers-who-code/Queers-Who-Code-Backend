/**
 * @file ClientResponse is a module that standardizes the responses that
 * are sent to a client. The module assumes that the Express framework is
 * being used and it is therefore a requirement for the module to work. The
 * main function returned from the module is used to modify an Express Request
 * object by setting up the status codes and using a JSON payload with a
 * standardized response. The messages sent back to the client can be overriden
 * with custom messages. It is also possible to send data back to the client.
 * All of the standardized messages are client safe, meaning they do not leak
 * information regarding what specifically went wrong in the case of an error.
 * Remember that all messages, standard and custom, are easily viewable by the
 * client and therefore it would be unwise to send anything you would not want
 * the client to see.
 *
 * @module Utils/ClientResponse
 * @requires {@link https://www.npmjs.com/package/express Express}
 */

/**
 * @constant {object} StatusCodes
 * An object containg key-value pairs that map directly to standard HTTP
 * status codes. All keys are numeric values with a matching string
 * containing client safe statuses.
 * @example
 * // Providing a numeric HTTP Status code returns the matching string
 * StatusCodes[200] => "Success"
 * StatusCodes[404] => "Not Found"
 */
const StatusCodes = {
  200: 'Success',
  201: 'Created',
  202: 'Accepted',
  204: 'No Content',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
};

/**
 * @constant {object} StatusMessages
 * An object containg key-value pairs that map directly to standard HTTP
 * status codes. All keys are numeric values with a matching string
 * containing client safe status messages.
 * @example
 * //Providing a numeric HTTP Status code returns the matching string
 * StatusMessages[200] => "Request succeeded."
 * StatusMessages[404] => "Nothing to see here ¯\_(ツ)_/¯."
 */
const StatusMessages = {
  200: 'Request succeeded.',
  201: 'Resource successfully created.',
  202: 'The request is being processed and may take some time.',
  204: 'There is nothing to return.',
  400: 'Request failed, please try again.',
  401: 'Please check credentials and try again.',
  403: 'You must be logged in to access this resource.',
  404: 'Nothing to see here ¯_(ツ)_/¯.', // eslint-disable-line no-useless-escape
  500: 'Something has gone wrong, please try again.',
};

/**
 * @description Takes an Express response object, an http status code, as well
 * as optional custom messages and data. Using these parameters, it returns
 * a formatted Express response with a JSON payload configured with the optional
 * parameters. This function is useful for standardizing API responses.
 * @param {Express.Response} res An Express Response object
 * @param {number} code An HTTP Status Code
 * @param {Array<String>=} messages
 * An optional array of strings to replace the default ones provided by the
 * StatusMessages object.
 * @param {any=} data
 * Any data that may need to be sent to the client. This is left intentionally
 * as open as possible so that it can be very versatile. An example might be
 * returning a JWT to the user under the data heading.
 * @returns {Express.Response} The modified response object.
 * @example <caption>Example showing basic usage with defaults</caption>
 * router.get('/', (req, res) => {
 *  return respondWith(res, 200);
 * });
 *
 * // The returned json payload to the user:
 * {
 *  status: "Success",
 *  messages: [
 *    "Request succeeded."
 *  ]
 * }
 * @example <caption>Example overriding defaults</caption>
 * router.post('/user', (req, res) => {
 *  const user = new User(req.body);
 *
 *  user.save().then(() => {
 *    return respondWith(res, 201, ["User was successfully created!"]);
 *  });
 * });
 */
function respondWith(res, code, messages, data) {
  const payload = {
    status: StatusCodes[code],
    messages: messages || [StatusMessages[code]],
  };

  if (data) {
    payload.data = data;
  }

  return res.status(code).json(payload);
}

module.exports = {
  respondWith,
};
