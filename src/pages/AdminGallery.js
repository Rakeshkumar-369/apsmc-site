import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAuth } from '../context/AuthContext'; // NEW: To get the auth token
import { FaUpload, FaTrash, FaSpinner } from 'react-icons/fa'; // NEW: Icons for UI feedback

function AdminGallery() {
  // --- NEW: State for images, form input, and submission status ---
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const API_BASE_URL = 'http://10.0.0.195:5000';

  // --- NEW: Function to fetch all gallery images ---
  const fetchImages = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/image`);
      if (!response.ok) throw new Error('Failed to fetch gallery images.');
      const data = await response.json();
      setImages(data.images || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // --- NEW: Handler for the file input ---
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // --- NEW: Function to handle uploading a new image ---
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image to upload.');
      return;
    }
    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('action', 'add');
    formData.append('category', 'gallery'); // As per API docs for gallery uploads
    formData.append('image', file);

    try {
      const response = await fetch(`${API_BASE_URL}/image`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to upload image.');
      
      setFile(null);
      e.target.reset();
      fetchImages(); // Refresh the gallery
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // --- NEW: Function to handle deleting an image ---
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`,
        },
        body: new URLSearchParams({ action: 'delete', id }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to delete image.');
      fetchImages(); // Refresh the gallery
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };
  
  const getImageUrl = (url) => `${API_BASE_URL}${url}`;

  // --- Your original, unchanged JSX layout, now using the new logic ---
  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Manage Gallery</h1>
        
        {/* Your original "Upload Image" form, now connected to handleUpload */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
          <form onSubmit={handleUpload}>
            <div className="mb-4">
              <label htmlFor="image-upload" className="block text-gray-700">Image</label>
              <input type="file" id="image-upload" onChange={handleFileChange} 
                className="w-full mt-2 p-2 border rounded" required accept="image/*" />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button type="submit" disabled={isUploading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 flex items-center">
              {isUploading ? <FaSpinner className="animate-spin mr-2" /> : <FaUpload className="mr-2" />}
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
        </div>

        {/* Your original "Existing Images" section, now populated from the API */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Existing Images</h2>
          {isLoading ? <p>Loading images...</p> : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {images.map(image => (
                <div key={image.id} className="relative group border rounded-lg overflow-hidden shadow">
                  <img src={getImageUrl(image.url)} alt={`Gallery item ${image.id}`} className="w-full h-32 object-cover"/>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                    <button onClick={() => handleDelete(image.id)} className="text-white opacity-0 group-hover:opacity-100 p-2 bg-red-600 rounded-full transition-opacity" title="Delete">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminGallery;