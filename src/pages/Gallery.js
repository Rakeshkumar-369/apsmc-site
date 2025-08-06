import React, { useState } from 'react';
// Idatawould come from your backend API.
// larger set of placeholder images.
const allGalleryImages = [
  { id: 1, url: 'https://via.placeholder.com/400x300?text=Photo+1', caption: 'Inauguration Ceremony' },
  { id: 2, url: 'https://via.placeholder.com/400x300?text=Photo+2', caption: 'Community Meeting in Guntur' },
  { id: 3, url: 'https://via.placeholder.com/400x300?text=Photo+3', caption: 'Scholarship Distribution Event' },
  { id: 4, url: 'https://via.placeholder.com/400x300?text=Photo+4', caption: 'Skill Development Workshop' },
  { id: 5, url: 'https://via.placeholder.com/400x300?text=Photo+5', caption: 'Visit to Minority Welfare Hostel' },
  { id: 6, url: 'https://via.placeholder.com/400x300?text=Photo+6', caption: 'Press Conference with the Chairman' },
  { id: 7, url: 'https://via.placeholder.com/400x300?text=Photo+7', caption: 'Awareness Campaign Launch' },
  { id: 8, url: 'https://via.placeholder.com/400x300?text=Photo+8', caption: 'Annual General Body Meeting' },
  { id: 9, url: 'https://via.placeholder.com/400x300?text=Photo+9', caption: 'Legal Aid Camp' },
  { id: 10, url: 'https://via.placeholder.com/400x300?text=Photo+10', caption: 'Educational Seminar' },
  { id: 11, url: 'https://via.placeholder.com/400x300?text=Photo+11', caption: 'Cultural Fest Celebrations' },
  { id: 12, url: 'https://via.placeholder.com/400x300?text=Photo+12', caption: 'Meeting with Government Officials' },
];

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="bg-apsmc-light py-20 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-apsmc-primary mb-4" data-aos="fade-down">
          Photo Gallery
        </h2>
        <p className="text-lg text-gray-700 mb-12" data-aos="fade-down" data-aos-delay="100">
          A glimpse into the activities and events of the Andhra Pradesh State Minorities Commission.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allGalleryImages.map((image, index) => (
            <div
              key={image.id}
              className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => openModal(image)}
              data-aos="zoom-in"
              data-aos-delay={index * 50}
            >
              <img src={image.url} alt={image.caption} className="w-full h-48 object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="bg-white p-4 rounded-lg shadow-2xl max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.url} alt={selectedImage.caption} className="w-full h-auto rounded-md" />
            <p className="text-center text-gray-800 mt-4 font-semibold">{selectedImage.caption}</p>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl font-bold"
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