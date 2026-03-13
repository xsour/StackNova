const db = require('../models/mock-db');
const { sendData, sendError, sendList } = require('../utils/response');

function listCategories(req, res) {
  return sendData(res, db.getCategories());
}

function categoryArticles(req, res) {
  const result = db.getArticlesByCategory(req.params.slug, {
    page: Number(req.query.page || 1),
    perPage: Number(req.query.perPage || 10)
  });

  if (!result) {
    return sendError(res, 404, 'NOT_FOUND', 'Category not found');
  }

  return sendList(res, result.data, result.meta);
}

module.exports = {
  listCategories,
  categoryArticles
};
