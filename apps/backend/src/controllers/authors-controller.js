const db = require('../models/mock-db');
const { sendData, sendError, sendList } = require('../utils/response');

function authorProfile(req, res) {
  const author = db.getAuthorBySlug(req.params.slug);
  if (!author) {
    return sendError(res, 404, 'NOT_FOUND', 'Author not found');
  }

  return sendData(res, author);
}

function authorArticles(req, res) {
  const result = db.getArticlesByAuthor(req.params.slug, {
    page: Number(req.query.page || 1),
    perPage: Number(req.query.perPage || 10)
  });

  if (!result) {
    return sendError(res, 404, 'NOT_FOUND', 'Author not found');
  }

  return sendList(res, result.data, result.meta);
}

module.exports = {
  authorProfile,
  authorArticles
};
