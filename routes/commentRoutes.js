const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Các route liên quan đến bình luận
router.get('/', commentController.getComments);
router.post('/', commentController.createComment);

module.exports = router;
