const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    data: {
      status: 'ok',
      service: 'backend',
      timestamp: new Date().toISOString()
    }
  });
});

module.exports = router;
