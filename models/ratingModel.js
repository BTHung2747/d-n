// ratingModel.js
const db = require('../config/db');

const Rating = {
  // Lấy đánh giá của tài liệu
  getRatingsByDocumentId: async (documentId) => {
    const query = 'SELECT * FROM ratings WHERE document_id = ?';
    try {
      const [results] = await db.execute(query, [documentId]);
      return results;
    } catch (err) {
      throw new Error('Error fetching ratings: ' + err.message);
    }
  },

  // Thêm đánh giá
  addRating: async (documentId, userId, rating) => {
    const query = 'INSERT INTO ratings (document_id, user_id, rating) VALUES (?, ?, ?)';
    try {
      await db.execute(query, [documentId, userId, rating]);
    } catch (err) {
      throw new Error('Error adding rating: ' + err.message);
    }
  },

  // Cập nhật đánh giá
  updateRating: async (id, rating) => {
    const query = 'UPDATE ratings SET rating = ? WHERE id = ?';
    try {
      await db.execute(query, [rating, id]);
    } catch (err) {
      throw new Error('Error updating rating: ' + err.message);
    }
  },

  // Xóa đánh giá
  deleteRating: async (id) => {
    const query = 'DELETE FROM ratings WHERE id = ?';
    try {
      await db.execute(query, [id]);
    } catch (err) {
      throw new Error('Error deleting rating: ' + err.message);
    }
  }
};

module.exports = Rating;
