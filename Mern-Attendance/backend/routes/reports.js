const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { getDailyReport } = require('../controllers/reportController');

router.get('/daily', auth, getDailyReport);

module.exports = router;