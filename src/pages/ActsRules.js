import React, { useState, useEffect } from 'react';
import { FaFilePdf } from 'react-icons/fa';

// --- Your original component structure ---
function ActsRules() {
  // --- NEW: State for fetching documents and handling loading/error states ---
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = 'http://10.0.0.195:5000';

  // --- NEW: Fetch documents from the API when the component loads ---
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/documents`);
        if (!response.ok) {
          throw new Error('Failed to fetch documents.');
        }
        const data = await response.json();
        // As per the requirement, filter for 'ActsRules' category
        const actsRulesDocs = data.filter(doc => doc.category === 'ActsRules');
        setDocuments(actsRulesDocs);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []); // Empty array ensures this runs only once

  // --- NEW: Helper function to get the full URL for the document file ---
  const getFileUrl = (filePath) => {
    // The API provides a relative path, e.g., "uploads/Documents/file.pdf"
    // We prepend the base URL to make it a complete, clickable link.
    return `${API_BASE_URL}/${filePath}`;
  };
  
  // --- Your original, unchanged JSX layout ---
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-apsmc-blue mb-8">
          Acts & Rules
        </h1>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {/* --- MODIFIED: Conditional rendering for loading, error, and data states --- */}
            {loading && <li className="p-6 text-center text-gray-500">Loading documents...</li>}
            {error && <li className="p-6 text-center text-red-500 bg-red-100">{error}</li>}
            {!loading && !error && documents.length > 0 ? (
              // --- MODIFIED: Mapping over fetched documents ---
              documents.map((doc) => (
                <li key={doc.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                  <a
                    href={getFileUrl(doc.filepath)} // Use the dynamic URL
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4"
                  >
                    <FaFilePdf className="text-4xl text-red-600" />
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-gray-800">
                        {doc.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {/* Example of displaying other data if needed */}
                        Filename: {doc.filename}
                      </p>
                    </div>
                    <span className="text-blue-500 font-semibold hover:underline">
                      View/Download
                    </span>
                  </a>
                </li>
              ))
            ) : (
              // --- MODIFIED: Handle case where no documents are found ---
              !loading && !error && <li className="p-6 text-center text-gray-500">No Acts or Rules found.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ActsRules;