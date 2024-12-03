const db = require('../config/db');  // Import db kết nối MySQL

const Category = {
  // Lấy danh sách các chuyên mục
  getCategories: (callback) => {
    const query = 'SELECT * FROM categories';  // Câu truy vấn lấy danh sách chuyên mục
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching categories:", err.message);  // In ra lỗi nếu có
        return callback(err, null);  // Trả về lỗi cho callback
      }
      return callback(null, results);  // Trả về kết quả cho callback
    });
  },

  // Thêm mới chuyên mục
  addCategory: (name, description, callback) => {
    const query = 'INSERT INTO categories (name, description) VALUES (?, ?)';  // Câu truy vấn thêm chuyên mục
    db.query(query, [name, description], (err, results) => {
      if (err) {
        console.error("Error adding category:", err.message);  // In lỗi chi tiết ra console
        return callback(err, null);  // Trả về lỗi cho callback
      }
      return callback(null, results);  // Trả về kết quả cho callback
    });
  },

  // Cập nhật thông tin chuyên mục
  updateCategory: (id, name, description, callback) => {
    const query = 'UPDATE categories SET name = ?, description = ? WHERE id = ?';  // Câu truy vấn cập nhật
    db.query(query, [name, description, id], (err, results) => {
      if (err) {
        console.error("Error updating category:", err.message);  // In lỗi chi tiết ra console
        return callback(err, null);  // Trả về lỗi cho callback
      }
      return callback(null, results);  // Trả về kết quả cho callback
    });
  },

  // Xóa chuyên mục
  deleteCategory: (id, callback) => {
    const query = 'DELETE FROM categories WHERE id = ?';  // Câu truy vấn xóa chuyên mục
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error deleting category:", err.message);  // In lỗi chi tiết ra console
        return callback(err, null);  // Trả về lỗi cho callback
      }
      return callback(null, results);  // Trả về kết quả cho callback
    });
  }
};

module.exports = Category;
