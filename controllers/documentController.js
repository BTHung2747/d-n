const Document = require('../models/documentModel');

// Lấy danh sách tài liệu
const getDocuments = async (req, res) => {
  try {
    const documents = await Document.getDocuments();
    res.status(200).json({ documents });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching documents', error: err.message });
  }
};

// Lấy tài liệu theo ID
const getDocumentById = async (req, res) => {
  const { id } = req.params;
  try {
    const document = await Document.getDocumentById(id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.status(200).json({ document });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching document', error: err.message });
  }
};

// Upload tài liệu
const uploadDocument = async (req, res) => {
  const { title, description, file_path, category_id, user_id } = req.body;
  try {
    await Document.uploadDocument(title, description, file_path, category_id, user_id);
    res.status(201).json({ message: 'Document uploaded successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error uploading document', error: err.message });
  }
};

module.exports = { getDocuments, getDocumentById, uploadDocument };
