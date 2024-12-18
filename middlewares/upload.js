const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Kiểm tra và tạo thư mục nếu không tồn tại
const ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = file.mimetype.startsWith('image') ? 'images' : 'documents';
    const fullPath = path.join(__dirname, '../../uploads', uploadPath);
    ensureDirExists(fullPath); // Kiểm tra và tạo thư mục nếu không tồn tại
    cb(null, fullPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Thêm thời gian vào tên file
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type. Only images and PDFs are allowed.'));
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Giới hạn tệp tối đa 10MB
  fileFilter: fileFilter
});

module.exports = upload;
