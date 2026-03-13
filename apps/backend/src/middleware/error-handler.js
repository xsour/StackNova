const { sendError } = require('../utils/response');

function errorHandler(err, req, res, next) {
  console.error(err);
  return sendError(res, 500, 'INTERNAL_SERVER_ERROR', 'Unexpected server error');
}

module.exports = {
  errorHandler
};
