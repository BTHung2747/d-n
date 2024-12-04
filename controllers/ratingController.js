// ratingController.js
const Rating = require('../models/ratingModel'); // Import Rating model

// Lấy tất cả đánh giá của tài liệu theo documentId
const getRatingsByDocumentId = (req, res) => {
  const { documentId } = req.params; // Lấy documentId từ URL

  Rating.getRatingsByDocumentId(documentId, (err, ratings) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching ratings', error: err.message });
    }
    if (ratings.length === 0) {
      return res.status(404).json({ message: 'No ratings found for this document' });
    }
    res.json({ ratings });
  });
};

// Thêm đánh giá mới
const addRating = (req, res) => {
  const { documentId, userId, rating } = req.body; // Lấy dữ liệu từ body

  Rating.addRating(documentId, userId, rating, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding rating', error: err.message });
    }
    res.status(201).json({ message: 'Rating added successfully' });
  });
};

// Cập nhật đánh giá
const updateRating = (req, res) => {
  const { id } = req.params; // Lấy ID của rating từ URL
  const { rating } = req.body; // Lấy rating mới từ body

  Rating.updateRating(id, rating, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating rating', error: err.message });
    }
    res.json({ message: 'Rating updated successfully' });
  });
};

// Xóa đánh giá
const deleteRating = (req, res) => {
  const { id } = req.params; // Lấy ID của rating từ URL

  Rating.deleteRating(id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting rating', error: err.message });
    }
    res.json({ message: 'Rating deleted successfully' });
  });
};

module.exports = { getRatingsByDocumentId, addRating, updateRating, deleteRating };
