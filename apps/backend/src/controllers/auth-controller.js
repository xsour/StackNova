const { sendError } = require('../utils/response');

function login(req, res) {
  return sendError(res, 501, 'NOT_IMPLEMENTED', 'JWT login will be implemented by backend developer');
}

function logout(req, res) {
  return sendError(res, 501, 'NOT_IMPLEMENTED', 'Logout will be implemented by backend developer');
}

module.exports = {
  login,
  logout
};
