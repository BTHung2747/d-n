const db = require('../config/db');  // Kết nối với cơ sở dữ liệu

const Document = {
  // Lấy danh sách tài liệu
  getDocuments: (callback) => {
    const query = 'SELECT * FROM documents';
    db.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  // Lấy tài liệu theo ID
  getDocumentById: (id, callback) => {
    const query = 'SELECT * FROM documents WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },

  // Upload tài liệu
  uploadDocument: (title, description, filePath, categoryId, userId, callback) => {
    const query = 'INSERT INTO documents (title, description, file_path, category_id, user_id) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [title, description, filePath, categoryId, userId], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  // Cập nhật tài liệu
  updateDocument: (id, title, description, categoryId, callback) => {
    const query = 'UPDATE documents SET title = ?, description = ?, category_id = ? WHERE id = ?';
    db.query(query, [title, description, categoryId, id], (err, results) => {
      if (err) return callback(err);
      if (results.affectedRows === 0) {
        return callback(new Error('Document not found'));
      }
      callback(null, results);
    });
  },

  // Xóa tài liệu
  deleteDocument: (id, callback) => {
    const query = 'DELETE FROM documents WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
};

module.exports = Document;
