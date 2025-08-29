import React, { useState, useEffect } from 'react';

// --- Your original component structure ---
function Gallery() {
  // --- NEW: State for fetching images and managing the lightbox view ---
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // For lightbox
  const API_BASE_URL = 'http://10.0.0.195:5000';

  // --- NEW: Fetch images from the API when the component loads ---
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/image`);
        if (!response.ok) {
          throw new Error('Failed to fetch gallery images.');
        }
        const data = await response.json();
        // The API returns an object with an 'images' array
        setImages(data.images || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []); // Empty array ensures this runs only once

  // --- NEW: Helper function to get the full URL for an image ---
  const getImageUrl = (imagePath) => {
    // The 'url' from the API is a relative path, e.g., /images/filename.jpg
    return `${API_BASE_URL}${imagePath}`;
  };

  // --- Your original, unchanged JSX layout ---
  return (
    <div className="bg-gray-100 py-20 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-apsmc-primary mb-12">
          Our Gallery
        </h1>

        {/* --- MODIFIED: Conditional rendering for loading, error, and data states --- */}
        {loading && <p className="text-center text-gray-600">Loading images...</p>}
        {error && <p className="text-center text-red-500 bg-red-100 p-4 rounded-md">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* --- MODIFIED: Mapping over fetched images --- */}
            {images.map((image) => (
              <div
                key={image.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
                data-aos="fade-up"
                onClick={() => setSelectedImage(getImageUrl(image.url))} // --- NEW: Open lightbox on click
              >
                <img
                  src={getImageUrl(image.url)}
                  alt={`Gallery item ${image.id}`}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- NEW: Lightbox Modal for viewing full image (does not affect page layout) --- */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)} // Close on background click
        >
          <div className="relative max-w-4xl max-h-full p-4">
            <img
              src={selectedImage}
              alt="Full-size view"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-3xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;