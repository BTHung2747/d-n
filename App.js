import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";  
import Navbar from "./components/Navbar";
import HomeView from "./components/HomeView";
import DocumentsView from "./components/DocumentsView";
import DocumentDetail from "./components/DocumentDetail";
import UploadView from "./components/UploadView";
import axios from "axios";
import "./App.css";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    // Fetch categories and documents from the API
    const fetchData = async () => {
      try {
        const categoryResponse = await axios.get("http://localhost:5000/categories");
        setCategories(categoryResponse.data);

        const documentResponse = await axios.get("http://localhost:5000/documents");
        setDocuments(documentResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const filteredDocuments = documents.filter((doc) => {
    const matchesCategory =
      selectedCategory === "all" || doc.category_id === selectedCategory;
    const matchesSearchTerm =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  return (
    <Router>
      <div className="App">
        {/* Sử dụng useLocation() trong Router */}
        <InnerApp 
          categories={categories}
          filteredDocuments={filteredDocuments}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setSelectedDocument={setSelectedDocument}
          selectedDocument={selectedDocument}
        />
      </div>
    </Router>
  );
};

const InnerApp = ({
  categories,
  filteredDocuments,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  setSelectedDocument,
  selectedDocument
}) => {
  const location = useLocation();  // Lấy thông tin đường dẫn hiện tại

  return (
    <div className="App">
      {/* Ẩn Navbar khi ở trang chủ */}
      {location.pathname !== "/" && <Navbar />}
      <div className="content-container">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route
            path="/documents"
            element={
              <DocumentsView
                categories={categories}
                documents={filteredDocuments}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setSelectedDocument={setSelectedDocument}
              />
            }
          />
          <Route
            path="/documents/:id"
            element={<DocumentDetail document={selectedDocument} setSelectedDocument={setSelectedDocument} />}
          />
          <Route path="/upload" element={<UploadView categories={categories} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
