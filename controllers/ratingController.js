// ratingController.js

const Rating = require('../models/ratingModel');

// Lấy đánh giá của tài liệu
const getRatingsByDocumentId = async (req, res) => {
  const { documentId } = req.params;
  try {
    const ratings = await Rating.getRatingsByDocumentId(documentId);
    res.json({ ratings });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching ratings', error: err });
  }
};

// Thêm đánh giá
const addRating = async (req, res) => {
  const { documentId, userId, rating } = req.body;
  try {
    await Rating.addRating(documentId, userId, rating);
    res.status(201).json({ message: 'Rating added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding rating', error: err });
  }
};

// Xóa đánh giá
const deleteRating = async (req, res) => {
  const { id } = req.params;
  try {
    await Rating.deleteRating(id);
    res.json({ message: 'Rating deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting rating', error: err });
  }
};

module.exports = { getRatingsByDocumentId, addRating, deleteRating };
