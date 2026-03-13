const db = require('../models/mock-db');
const { sendData, sendError, sendList } = require('../utils/response');

function listTags(req, res) {
  return sendData(res, db.getTags());
}

function tagArticles(req, res) {
  const result = db.getArticlesByTag(req.params.slug, {
    page: Number(req.query.page || 1),
    perPage: Number(req.query.perPage || 10)
  });

  if (!result) {
    return sendError(res, 404, 'NOT_FOUND', 'Tag not found');
  }

  return sendList(res, result.data, result.meta);
}

module.exports = {
  listTags,
  tagArticles
};
