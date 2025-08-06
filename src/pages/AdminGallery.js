import React, { useState, useEffect } from 'react';
import { FaUpload, FaTrash } from 'react-icons/fa';

// This is a placeholder for your actual API URL.
const API_URL = 'http://localhost:5000';

// --- Sample Initial Data ---
// In a real app, this would be fetched from the API.
const initialGalleryImages = [
  { id: 1, url: 'https://via.placeholder.com/300/0000FF/FFFFFF?text=Event+1', name: 'Event 1' },
  { id: 2, url: 'https://via.placeholder.com/300/FF0000/FFFFFF?text=Meeting', name: 'Commission Meeting' },
  { id: 3, url: 'https://via.placeholder.com/300/008000/FFFFFF?text=Field+Visit', name: 'Field Visit' },
  { id: 4, url: 'https://via.placeholder.com/300/FFA500/FFFFFF?text=Awareness+Camp', name: 'Awareness Camp' },
];

function AdminGallery() {
  const [images, setImages] = useState(initialGalleryImages);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // In the future, you can uncomment this to fetch data from the real backend.
  /*
  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/gallery`);
        if (!response.ok) throw new Error('Failed to fetch images.');
        const data = await response.json();
        setImages(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);
  */
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setSelectedFile(file);
      setError('');
    } else {
      setSelectedFile(null);
      setError('Please select a valid image file (JPEG or PNG).');
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select an image to upload.');
      return;
    }

    const newImage = {
      id: Date.now(),
      url: URL.createObjectURL(selectedFile), // temporary local URL for display
      name: selectedFile.name,
    };

    setImages([newImage, ...images]);
    setSelectedFile(null); // Clearsselection
    document.getElementById('file-upload').value = ''; // Reset the file input
    setError('');

    // In the future, you would send the `selectedFile` to the backend here.
    alert(`(Frontend) Successfully uploaded: "${newImage.name}"`);
  };

  const handleDeleteImage = (idToDelete) => {
    setImages(images.filter(image => image.id !== idToDelete));
    
    // In the future, you would send a delete request to the backend here.
    alert(`(Frontend) Successfully deleted image ID: ${idToDelete}`);
  };

  return (
    <div className="bg-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Image Gallery</h2>

      {/* --- Upload Image Form --- */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Upload New Image</h3>
        <form onSubmit={handleUpload} className="flex items-center space-x-4">
          <input
            id="file-upload"
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            type="submit"
            disabled={!selectedFile}
            className="flex items-center bg-apsmc-primary text-white px-4 py-2 rounded-md hover:bg-green-700 transition disabled:bg-gray-400"
          >
            <FaUpload className="mr-2" />
            Upload
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      {/* --- Existing Image Grid --- */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Existing Images</h3>
        {isLoading && <p>Loading images...</p>}
        {images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map(image => (
              <div key={image.id} className="relative group">
                <img src={image.url} alt={image.name} className="w-full h-40 object-cover rounded-lg shadow-md" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleDeleteImage(image.id)}
                    className="text-white hover:text-red-500"
                    aria-label={`Delete ${image.name}`}
                  >
                    <FaTrash className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No images in the gallery.</p>
        )}
      </div>
    </div>
  );
}

export default AdminGallery;