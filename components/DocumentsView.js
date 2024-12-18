import React from "react";
import { FaSearch, FaUpload, FaSpinner, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import './DocumentsView.css'; // Import CSS

const DocumentsView = ({ documents, categories, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, setSelectedDocument, loading }) => {
  const navigate = useNavigate(); // Thêm useNavigate để điều hướng trang

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || doc.category_id.toString() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="documents-container">
      <div className="container">
        <div className="search-category-section">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search documents..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id.toString()}>{category.name}</option>
            ))}
          </select>
          <button
            onClick={() => navigate("/upload")}  // Dùng navigate để điều hướng đến trang upload
            className="upload-btn"
          >
            <FaUpload className="mr-2" /> Upload
          </button>
        </div>
        <div className="documents-grid">
          {loading ? (
            <div className="loading-spinner">
              <FaSpinner className="animate-spin text-4xl text-blue-600" />
            </div>
          ) : (
            filteredDocuments.map((doc) => (
              <div key={doc.id} className="document-card">
                <img
                  src={doc.image_path || "https://images.unsplash.com/photo-1568184979902-9d24ebc0bc2f"}
                  alt={doc.title}
                  className="document-image"
                />
                <div className="document-details">
                  <h3 className="document-title">{doc.title}</h3>
                  <p className="document-description">{doc.description}</p>
                  <div className="document-footer">
                    <span className="views">
                      {doc.views} views
                    </span>
                    <div className="action-buttons">
                      <button
                        onClick={() => {
                          setSelectedDocument(doc);
                          navigate(`/documents/${doc.id}`); // Dùng navigate để chuyển đến trang chi tiết tài liệu
                        }}
                        className="details-btn"
                      >
                        Details
                      </button>
                      <a
                        href={doc.file_path}
                        className="download-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaDownload className="mr-2" /> Download
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentsView;
