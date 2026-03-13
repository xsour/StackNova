const db = require('../models/mock-db');
const { sendData, sendError, sendList } = require('../utils/response');

function listArticles(req, res) {
  const page = Number(req.query.page || 1);
  const perPage = Number(req.query.perPage || 10);
  const category = req.query.category || '';
  const result = db.getArticles({ page, perPage, category });
  return sendList(res, result.data, result.meta);
}

function getArticle(req, res) {
  const article = db.getArticleBySlug(req.params.slug);
  if (!article) {
    return sendError(res, 404, 'NOT_FOUND', 'Article not found');
  }

  return sendData(res, article);
}

function getRelated(req, res) {
  const article = db.getArticleBySlug(req.params.slug);
  if (!article) {
    return sendError(res, 404, 'NOT_FOUND', 'Article not found');
  }

  return sendData(res, db.getRelatedArticles(req.params.slug));
}

function incrementView(req, res) {
  const article = db.incrementViews(Number(req.params.id));
  if (!article) {
    return sendError(res, 404, 'NOT_FOUND', 'Article not found');
  }

  return sendData(res, article);
}

module.exports = {
  listArticles,
  getArticle,
  getRelated,
  incrementView
};
