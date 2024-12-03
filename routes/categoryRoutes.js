const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Route để lấy danh sách các chuyên mục
router.get('/', categoryController.getCategories);  // Lấy danh sách chuyên mục

// Route để thêm chuyên mục
router.post('/', categoryController.addCategory);  // Thêm chuyên mục

// Route để cập nhật chuyên mục
router.put('/:id', categoryController.updateCategory);  // Cập nhật chuyên mục theo ID

// Route để xóa chuyên mục
router.delete('/:id', categoryController.deleteCategory);  // Xóa chuyên mục theo ID

module.exports = router;  // Export các route
