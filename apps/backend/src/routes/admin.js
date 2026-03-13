const { Router } = require('express');
const controller = require('../controllers/admin-controller');

const router = Router();

router.get('/articles', controller.notImplemented);
router.post('/articles', controller.notImplemented);
router.put('/articles/:id', controller.notImplemented);
router.delete('/articles/:id', controller.notImplemented);
router.post('/upload', controller.notImplemented);
router.get('/categories', controller.notImplemented);
router.post('/categories', controller.notImplemented);
router.put('/categories/:id', controller.notImplemented);
router.delete('/categories/:id', controller.notImplemented);

module.exports = router;
