const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Định nghĩa các route liên quan đến bình luận
router.get('/', commentController.getComments); // Lấy danh sách bình luận
router.post('/', commentController.createComment); // Thêm bình luận

module.exports = router;
