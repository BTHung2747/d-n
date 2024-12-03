const db = require('../config/db');  // Kết nối cơ sở dữ liệu MySQL
const bcrypt = require('bcryptjs');  // Dùng bcryptjs để mã hóa và so sánh mật khẩu

const User = {
  // Tìm người dùng theo email
  findByEmail: async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    try {
      const [results] = await db.execute(query, [email]); // Chạy câu truy vấn
      return results[0];  // Trả về người dùng đầu tiên nếu tìm thấy
    } catch (error) {
      throw new Error('Error fetching user by email: ' + error.message);
    }
  },

  // Tìm người dùng theo ID
  findById: async (id) => {
    const query = 'SELECT id, username, email, role FROM users WHERE id = ?';
    try {
      const [results] = await db.execute(query, [id]);  // Thực thi câu truy vấn
      return results[0];  // Trả về người dùng nếu tìm thấy
    } catch (error) {
      throw new Error('Error fetching user by ID: ' + error.message);
    }
  },

  // Tạo người dùng mới
  createUser: async (username, email, password_hash, role) => {
    const query = 'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)';
    try {
      const [results] = await db.execute(query, [username, email, password_hash, role]); // Thêm người dùng vào cơ sở dữ liệu
      return results;  // Trả về kết quả khi thêm thành công
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  },

  // So sánh mật khẩu người dùng nhập vào với mật khẩu đã mã hóa trong cơ sở dữ liệu
  comparePassword: async (password, hashedPassword) => {
    try {
      const isMatch = await bcrypt.compare(password, hashedPassword); // So sánh mật khẩu
      return isMatch;  // Trả về true nếu mật khẩu khớp, false nếu không khớp
    } catch (error) {
      throw new Error('Error comparing password: ' + error.message);
    }
  },
};

module.exports = User;
