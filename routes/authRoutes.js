const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');  // Đảm bảo import đúng controller

// Đăng ký người dùng
router.post('/register', authController.register);  // Đảm bảo bạn gọi đúng hàm register

// Đăng nhập người dùng
router.post('/login', authController.login);  // Đảm bảo bạn gọi đúng hàm login

// Lấy thông tin người dùng hiện tại (yêu cầu token)
router.get('/profile', authController.getProfile);  // Gọi đúng hàm getProfile

module.exports = router;  // Export các routes
