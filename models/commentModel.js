// commentModel.js
const db = require('../config/db');

const Comment = {
  // Lấy bình luận của tài liệu
  getCommentsByDocumentId: async (documentId) => {
    const query = 'SELECT * FROM comments WHERE document_id = ?';
    try {
      const [results] = await db.execute(query, [documentId]);
      return results;
    } catch (err) {
      throw new Error('Error fetching comments: ' + err.message);
    }
  },

  // Thêm bình luận
  addComment: async (documentId, userId, comment) => {
    const query = 'INSERT INTO comments (document_id, user_id, comment) VALUES (?, ?, ?)';
    try {
      await db.execute(query, [documentId, userId, comment]);
    } catch (err) {
      throw new Error('Error adding comment: ' + err.message);
    }
  },

  // Xóa bình luận
  deleteComment: async (id) => {
    const query = 'DELETE FROM comments WHERE id = ?';
    try {
      await db.execute(query, [id]);
    } catch (err) {
      throw new Error('Error deleting comment: ' + err.message);
    }
  }
};

module.exports = Comment;
