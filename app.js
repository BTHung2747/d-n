const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

// Cấu hình môi trường
dotenv.config();

// Import các route
const authRoutes = require('./routes/authRoutes');
const documentRoutes = require('./routes/documentRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const commentRoutes = require('./routes/commentRoutes');
const ratingRoutes = require('./routes/ratingRoutes');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file hosting
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route gốc
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Document Management System');
});

// Sử dụng các route
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/ratings', ratingRoutes);

// Lỗi 404 nếu route không tìm thấy
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found', path: req.originalUrl });
});

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
  console.error(`[Error] ${err.message}`);
  res.status(err.status || 500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

// Cấu hình port và chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
