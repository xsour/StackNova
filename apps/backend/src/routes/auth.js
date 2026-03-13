const { Router } = require('express');
const controller = require('../controllers/auth-controller');

const router = Router();

router.post('/login', controller.login);
router.post('/logout', controller.logout);

module.exports = router;
