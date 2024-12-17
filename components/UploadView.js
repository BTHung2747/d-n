import React, { useState } from "react";
import { FaSpinner, FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";  // Thêm useNavigate
import './UploadView.css'; // Import CSS cho component

const UploadView = ({ categories, handleUploadDocument }) => {
  const [formData, setFormData] = useState({
    title: "",
    category_id: "",
    description: "",
    file: null,
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // Khởi tạo useNavigate để điều hướng

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    for (const key in formData) {
      uploadData.append(key, formData[key]);
    }

    setLoading(true);
    await handleUploadDocument(uploadData);  // Gọi hàm upload
    setLoading(false);
    navigate("/documents");  // Điều hướng đến trang Documents sau khi tải lên thành công
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <h2 className="upload-title">Upload Document</h2>
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              required
              className="form-input"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              required
              className="form-input"
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              required
              className="form-input"
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>

          <div className="form-group">
            <label className="form-label">Document File</label>
            <input
              type="file"
              required
              className="form-input-file"
              onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              required
              className="form-input-file"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="submit-btn"
            >
              {loading ? <FaSpinner className="animate-spin" /> : <FaUpload />}
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadView;
