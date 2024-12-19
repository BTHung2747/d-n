import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaStar, FaComment } from "react-icons/fa";
import './DocumentDetail.css';

const DocumentDetail = ({
  selectedDocument,
  setView,
  handleAddRating,
  user,
  setSelectedDocument,
}) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [newComment, setNewComment] = useState({ text: "", rating: 5 });

  useEffect(() => {
    const fetchDocumentDetails = async () => {
      if (selectedDocument) {
        try {
          const response = await axios.get(`http://localhost:3001/api/documents/${selectedDocument.id}`);
          setSelectedDocument(response.data);
        } catch (error) {
          console.error("Error fetching document details:", error);
        }
      }
    };

    fetchDocumentDetails();
  }, [selectedDocument?.id, setSelectedDocument]);

  if (!selectedDocument) return <p>No document selected.</p>;

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/api/comments/${selectedDocument.id}`, {
        comment: newComment.text,
        rating: newComment.rating,
      });
      const response = await axios.get(`http://localhost:3001/api/documents/${selectedDocument.id}`);
      setSelectedDocument(response.data);
      setNewComment({ text: "", rating: 5 });
      setComment("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleRatingSubmit = async (value) => {
    if (value > 0) {
      await handleAddRating(selectedDocument.id, value);
      setRating(value); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={selectedDocument.image_path || "https://images.unsplash.com/photo-1568184979902-9d24ebc0bc2f"}
          alt={selectedDocument.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4">{selectedDocument.title}</h2>
          <p className="text-gray-600 mb-4">{selectedDocument.description}</p>
          <div className="flex items-center gap-4 mb-6">
            <span className="flex items-center gap-1">
              <FaEye className="text-gray-500" /> {selectedDocument.views}
            </span>
            <span className="flex items-center gap-1">
              <FaStar className="text-yellow-500" />{" "}
              {selectedDocument.average_rating || 0}
            </span>
          </div>
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-4">Comments</h3>
            <div className="space-y-4 mb-6">
              {selectedDocument.comments &&
                selectedDocument.comments.map((comment, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold">{comment.username}</p>
                    <p className="text-gray-600">{comment.comment}</p>
                  </div>
                ))}
            </div>
            {user && (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Your Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`text-2xl cursor-pointer ${
                          star <= rating ? "text-yellow-500" : "text-gray-300"
                        }`}
                        onClick={() => handleRatingSubmit(star)}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Your Comment</label>
                  <textarea
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    value={newComment.text}
                    onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                  ></textarea>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => setView("documents")}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleCommentSubmit}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center gap-2"
                  >
                    <FaComment /> Submit Comment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;
