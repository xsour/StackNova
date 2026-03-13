const { sendError } = require('../utils/response');

function notImplemented(req, res) {
  return sendError(res, 501, 'NOT_IMPLEMENTED', 'Admin CRUD will be implemented by backend developer');
}

module.exports = {
  notImplemented
};
