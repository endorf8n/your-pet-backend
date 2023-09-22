const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/notices');

router.get('/', ctrl.getAllNotices);

module.exports = router;