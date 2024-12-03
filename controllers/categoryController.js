const Category = require('../models/categoryModel');  // Import model Category

// Lấy danh sách các chuyên mục
const getCategories = (req, res) => {
  Category.getCategories((err, categories) => {  // Sử dụng callback trong model
    if (err) {
      console.error("Error fetching categories:", err.message);  // In lỗi chi tiết ra console
      return res.status(500).json({ message: 'Error fetching categories', error: err.message });
    }
    res.status(200).json({ categories });  // Trả về kết quả
  });
};

// Thêm chuyên mục mới
const addCategory = (req, res) => {
  const { name, description } = req.body;  // Lấy thông tin name và description từ body

  if (!name || !description) {
    return res.status(400).json({ message: 'Name and description are required' });  // Kiểm tra các trường
  }

  Category.addCategory(name, description, (err, result) => {  // Sử dụng callback trong model
    if (err) {
      console.error("Error adding category:", err.message);  // In lỗi chi tiết ra console
      return res.status(500).json({ message: 'Error adding category', error: err.message });
    }
    res.status(201).json({ message: 'Category added successfully', result });  // Trả về kết quả thành công
  });
};

// Cập nhật chuyên mục
const updateCategory = (req, res) => {
  const { id } = req.params;  // Lấy id chuyên mục từ tham số URL
  const { name, description } = req.body;  // Lấy thông tin name và description từ body

  if (!name || !description) {
    return res.status(400).json({ message: 'Name and description are required' });  // Kiểm tra các trường
  }

  Category.updateCategory(id, name, description, (err, result) => {  // Sử dụng callback trong model
    if (err) {
      console.error("Error updating category:", err.message);  // In lỗi chi tiết ra console
      return res.status(500).json({ message: 'Error updating category', error: err.message });
    }
    res.status(200).json({ message: 'Category updated successfully', result });  // Trả về kết quả thành công
  });
};

// Xóa chuyên mục
const deleteCategory = (req, res) => {
  const { id } = req.params;  // Lấy id chuyên mục từ tham số URL

  Category.deleteCategory(id, (err, result) => {  // Sử dụng callback trong model
    if (err) {
      console.error("Error deleting category:", err.message);  // In lỗi chi tiết ra console
      return res.status(500).json({ message: 'Error deleting category', error: err.message });
    }
    res.status(200).json({ message: 'Category deleted successfully', result });  // Trả về kết quả thành công
  });
};

module.exports = { getCategories, addCategory, updateCategory, deleteCategory };
