const Comment = require('../models/commentModel');
// lấy toàn bộ bình luận
// cập nhật
// xóa

// Lấy danh sách bình luận theo documentId
const getComments = (req, res) => {
  const { documentId } = req.query;

  // Kiểm tra nếu documentId không được cung cấp
  if (!documentId) {
    return res.status(400).json({ message: 'documentId is required' });
  }

  Comment.getCommentsByDocumentId(documentId, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching comments', error: err.message });
    }
    res.json({ comments: results });
  });
};

// Thêm bình luận
const createComment = (req, res) => {
  const { documentId, userId, comment } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!documentId || !userId || !comment) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  Comment.addComment(documentId, userId, comment, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding comment', error: err.message });
    }
    res.status(201).json({ message: 'Comment added successfully', commentId: results.insertId });
  });
};

module.exports = { getComments, createComment };
