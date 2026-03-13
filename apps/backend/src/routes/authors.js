const { Router } = require('express');
const controller = require('../controllers/authors-controller');

const router = Router();

router.get('/:slug', controller.authorProfile);
router.get('/:slug/articles', controller.authorArticles);

module.exports = router;
