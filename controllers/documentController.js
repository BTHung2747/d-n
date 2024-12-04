const Document = require('../models/documentModel');

// Lấy danh sách tài liệu
const getDocuments = (req, res) => {
  Document.getDocuments((err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching documents', error: err.message });
    }
    res.json({ documents: results });
  });
};

// Lấy tài liệu theo ID
const getDocumentById = (req, res) => {
  const { id } = req.params;  // Lấy id từ URL
  Document.getDocumentById(id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching document', error: err.message });
    }
    if (!result) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json({ document: result });
  });
};

// Upload tài liệu
const uploadDocument = (req, res) => {
  const { title, description, categoryId, userId } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const filePath = `/uploads/${file.filename}`;
  
  Document.uploadDocument(title, description, filePath, categoryId, userId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading document', error: err.message });
    }
    res.status(201).json({ message: 'Document uploaded successfully', documentId: result.insertId });
  });
};

// Cập nhật tài liệu
const updateDocument = (req, res) => {
  const { id } = req.params;
  const { title, description, categoryId } = req.body;

  Document.updateDocument(id, title, description, categoryId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating document', error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json({ message: 'Document updated successfully' });
  });
};

// Xóa tài liệu
const deleteDocument = (req, res) => {
  const { id } = req.params;

  Document.deleteDocument(id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting document', error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json({ message: 'Document deleted successfully' });
  });
};

module.exports = { getDocuments, getDocumentById, uploadDocument, updateDocument, deleteDocument };
