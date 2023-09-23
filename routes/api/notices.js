const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/notices');
const { authenticate, upload, isValidId } = require('../../middlewares');

router.get('/', ctrl.getAllNotices);
router.get('/:noticeId', isValidId, ctrl.getNoticeById);
router.get("/favorites/v2", authenticate, ctrl.getNoticesInFavorites);
router.post('/', authenticate, upload.single('file'), ctrl.addNotice);
router.patch('/:noticeId/favorites', authenticate, isValidId, ctrl.updateNoticeFavorites);

module.exports = router;