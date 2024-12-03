const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

// Các route liên quan đến đánh giá
router.get('/:documentId', ratingController.getRatingsByDocumentId);
router.post('/', ratingController.addRating);
router.delete('/:id', ratingController.deleteRating);

module.exports = router;
