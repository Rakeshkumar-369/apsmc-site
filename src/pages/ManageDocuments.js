import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAuth } from '../context/AuthContext'; // NEW: To get the auth token
import { FaPlus, FaTrash, FaSpinner, FaFilePdf } from 'react-icons/fa'; // NEW: Icons for UI feedback

function ManageDocuments() {
  // --- NEW: State for documents, form inputs, and submission status ---
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('ActsRules'); // Default category
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const API_BASE_URL = 'http://10.0.0.195:5000';

  // --- NEW: Function to fetch all documents ---
  const fetchDocuments = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/documents`);
      if (!response.ok) throw new Error('Failed to fetch documents.');
      const data = await response.json();
      setDocuments(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  // --- NEW: Handler for the file input ---
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // --- NEW: Function to handle uploading a new document ---
  const handleAddDocument = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append('action', 'add');
    formData.append('title', title);
    formData.append('category', category);
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/documents`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to add document.');
      
      setTitle('');
      setCategory('ActsRules');
      setFile(null);
      e.target.reset();
      fetchDocuments();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- NEW: Function to handle deleting a document ---
  const handleDeleteDocument = async (id) => {
    if (!window.confirm('Are you sure you want to delete this document?')) return;
    
    const formData = new FormData();
    formData.append('action', 'delete');
    formData.append('id', id);

    try {
      const response = await fetch(`${API_BASE_URL}/documents`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to delete document.');
      fetchDocuments();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // --- Your original, unchanged JSX layout, now using the new logic ---
  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Manage Documents</h1>
        
        {/* Your original "Add Document" form, now connected to handleAddDocument */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Add Document</h2>
          <form onSubmit={handleAddDocument}>
            <div className="mb-4">
              <label htmlFor="doc-title" className="block text-gray-700">Title</label>
              <input type="text" id="doc-title" value={title} onChange={(e) => setTitle(e.target.value)}
                className="w-full mt-2 p-2 border rounded" required />
            </div>
            <div className="mb-4">
              <label htmlFor="doc-category" className="block text-gray-700">Category</label>
              <select id="doc-category" value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-2 p-2 border rounded bg-white" required>
                <option value="ActsRules">Acts & Rules</option>
                <option value="CircularsOrders">Circulars & Orders</option>
                <option value="Tenders">Tenders</option>
                <option value="Budget">Budget</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="doc-file" className="block text-gray-700">File</label>
              <input type="file" id="doc-file" onChange={handleFileChange}
                className="w-full mt-2 p-2 border rounded" required />
            </div>
            {/* NEW: Displaying errors and submission status on the button */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button type="submit" disabled={isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 flex items-center">
              {isSubmitting ? <FaSpinner className="animate-spin mr-2" /> : <FaPlus className="mr-2" />}
              {isSubmitting ? 'Uploading...' : 'Add Document'}
            </button>
          </form>
        </div>

        {/* Your original "Existing Documents" section, now populated from the API */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Existing Documents</h2>
          {isLoading ? <p>Loading documents...</p> : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Title</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Category</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Filename</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300"></th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map(doc => (
                    <tr key={doc.id}>
                      <td className="px-6 py-4 border-b border-gray-200 flex items-center"><FaFilePdf className="text-red-500 mr-2" /> {doc.title}</td>
                      <td className="px-6 py-4 border-b border-gray-200">{doc.category}</td>
                      <td className="px-6 py-4 border-b border-gray-200">{doc.filename}</td>
                      <td className="px-6 py-4 border-b border-gray-200 text-right">
                        <button onClick={() => handleDeleteDocument(doc.id)} className="text-red-500 hover:text-red-700">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default ManageDocuments;