const db = require('../config/db');

const Comment = {
  // Lấy bình luận của tài liệu
  getCommentsByDocumentId: (documentId, callback) => {
    const query = 'SELECT * FROM comments WHERE document_id = ?';
    db.query(query, [documentId], callback);
  },

  // Thêm bình luận
  addComment: (documentId, userId, comment, callback) => {
    const query = 'INSERT INTO comments (document_id, user_id, comment) VALUES (?, ?, ?)';
    db.query(query, [documentId, userId, comment], callback);
  },

  // Xóa bình luận
  deleteComment: (id, callback) => {
    const query = 'DELETE FROM comments WHERE id = ?';
    db.query(query, [id], callback);
  },
};

module.exports = Comment;
