const express = require('express');
const router = express.Router();

const telegramMiddleware = require('../middleware/telegram.middleware');

router.get('/', (req, res, next) => {
    res.sendStatus(200);
});

router.get('/health', (req, res) => {
    res.status(200).json({
      startDate: req.serverStartTime,
      dateNow: new Date()
    });
  })

router.post('/', telegramMiddleware.callController);

module.exports = router;