// commentController.js

const Comment = require('../models/commentModel');

// Lấy danh sách bình luận theo documentId
const getComments = async (req, res) => {
  const { documentId } = req.query;
  try {
    const comments = await Comment.getCommentsByDocumentId(documentId);
    res.json({ comments });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching comments', error: err });
  }
};

// Thêm bình luận
const createComment = async (req, res) => {
  const { documentId, userId, comment } = req.body;
  try {
    await Comment.addComment(documentId, userId, comment);
    res.status(201).json({ message: 'Comment added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding comment', error: err });
  }
};

module.exports = { getComments, createComment };
