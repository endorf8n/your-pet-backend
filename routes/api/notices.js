const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/notices');
const { authenticate, upload, isValidId } = require('../../middlewares');

router.get('/', ctrl.getNotices);
router.get('/:noticeId', isValidId, ctrl.getNoticeById);
router.get("/favorites/v2", authenticate, ctrl.getNoticesInFavorites);
router.get('/user-notices/v2', authenticate, ctrl.getUserNotices);
router.post('/', authenticate, upload.single('file'), ctrl.addNotice);
router.patch('/:noticeId/add-to-favorites', authenticate, isValidId, ctrl.updateNoticeFavorites);
router.patch('/:noticeId/remove-from-favorites', authenticate, isValidId, ctrl.removeNoticeFavorites);
router.delete('/:noticeId', authenticate, isValidId, ctrl.removeNotice);

module.exports = router;