import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAuth } from '../context/AuthContext'; // NEW: To get the auth token
import { FaPlus, FaTrash, FaSpinner } from 'react-icons/fa'; // NEW: Icons for UI feedback

function ManageNews() {
  // --- NEW: State for fetching news, managing the form, and handling submissions ---
  const [newsItems, setNewsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth(); // Get the token for authenticated requests
  
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const API_BASE_URL = 'http://10.0.0.195:5000';

  // --- NEW: Function to fetch all news items ---
  const fetchNews = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/news`);
      if (!response.ok) throw new Error('Failed to fetch news items.');
      const data = await response.json();
      setNewsItems(data.newsItems || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // --- NEW: Function to handle adding a new news item ---
  const handleAddNews = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`
        },
        body: new URLSearchParams({ action: 'add', title: newTitle, content: newContent })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to add news.');
      setNewTitle('');
      setNewContent('');
      fetchNews(); // Refresh the list
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- NEW: Function to handle deleting a news item ---
  const handleDeleteNews = async (id) => {
    if (!window.confirm('Are you sure you want to delete this news item?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`
        },
        body: new URLSearchParams({ action: 'delete', id: id })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to delete news.');
      fetchNews(); // Refresh the list
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // --- Your original, unchanged JSX layout, now using the new logic ---
  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Manage News</h1>
        
        {/* Your original "Add News" form, now connected to handleAddNews */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Add News Item</h2>
          <form onSubmit={handleAddNews}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700">Title</label>
              <input type="text" id="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                className="w-full mt-2 p-2 border rounded" required />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block text-gray-700">Content</label>
              <textarea id="content" value={newContent} onChange={(e) => setNewContent(e.target.value)}
                className="w-full mt-2 p-2 border rounded" required></textarea>
            </div>
            {/* NEW: Displaying errors and submission status on the button */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button type="submit" disabled={isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 flex items-center">
              {isSubmitting ? <FaSpinner className="animate-spin mr-2" /> : <FaPlus className="mr-2" />}
              {isSubmitting ? 'Adding...' : 'Add News'}
            </button>
          </form>
        </div>

        {/* Your original "Existing News" section, now populated from the API */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Existing News</h2>
          {/* NEW: Conditional rendering for loading and error states */}
          {isLoading ? <p>Loading news...</p> : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Title</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Content</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300"></th>
                  </tr>
                </thead>
                <tbody>
                  {/* MODIFIED: Mapping over fetched newsItems */}
                  {newsItems.map(item => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 border-b border-gray-200">{item.title}</td>
                      <td className="px-6 py-4 border-b border-gray-200">{item.content}</td>
                      <td className="px-6 py-4 border-b border-gray-200 text-right">
                        <button onClick={() => handleDeleteNews(item.id)}
                          className="text-red-500 hover:text-red-700">
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

export default ManageNews;