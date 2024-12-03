// documentModel.js
const db = require('../config/db');

const Document = {
  // Lấy danh sách tài liệu
  getDocuments: async () => {
    const query = 'SELECT * FROM documents';
    try {
      const [results] = await db.execute(query);
      return results;
    } catch (err) {
      throw new Error('Error fetching documents: ' + err.message);
    }
  },

  // Tải lên tài liệu
  uploadDocument: async (title, description, file_path, category_id, user_id) => {
    const query = 'INSERT INTO documents (title, description, file_path, category_id, user_id) VALUES (?, ?, ?, ?, ?)';
    try {
      await db.execute(query, [title, description, file_path, category_id, user_id]);
    } catch (err) {
      throw new Error('Error uploading document: ' + err.message);
    }
  }
};

module.exports = Document;
