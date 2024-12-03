const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');  

// Đảm bảo gọi đúng các phương thức từ controller
router.get('/', documentController.getDocuments);  // Gọi hàm getDocuments
router.get('/:id', documentController.getDocumentById);  // Gọi hàm getDocumentById
router.post('/', documentController.uploadDocument);  // Gọi hàm uploadDocument

module.exports = router;
