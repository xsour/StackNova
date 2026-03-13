const { Router } = require('express');
const controller = require('../controllers/categories-controller');

const router = Router();

router.get('/', controller.listCategories);
router.get('/:slug/articles', controller.categoryArticles);

module.exports = router;
