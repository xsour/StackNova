const { Router } = require('express');
const controller = require('../controllers/tags-controller');

const router = Router();

router.get('/', controller.listTags);
router.get('/:slug/articles', controller.tagArticles);

module.exports = router;
