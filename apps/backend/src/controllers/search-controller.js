const db = require('../models/mock-db');
const { sendList } = require('../utils/response');

function search(req, res) {
  const result = db.searchArticles(req.query.q || '');
  return sendList(res, result.data, result.meta);
}

module.exports = {
  search
};
