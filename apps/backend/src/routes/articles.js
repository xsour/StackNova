const { Router } = require('express');
const controller = require('../controllers/articles-controller');

const router = Router();

router.get('/', controller.listArticles);
router.get('/:slug/related', controller.getRelated);
router.get('/:slug', controller.getArticle);
router.post('/:id/view', controller.incrementView);

module.exports = router;
