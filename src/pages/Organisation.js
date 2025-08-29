import React, { useState, useEffect } from 'react';
// DELETED: The incorrect import statement has been removed from this line.

function Organisation() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = 'http://10.0.0.195:5000';
  
  // CORRECTED: Use the public path as a string for the fallback image.
  const FALLBACK_IMAGE_URL = '/images/aictc.png'; 

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/members`);
        if (!response.ok) {
          throw new Error('Failed to fetch members. Network response was not ok.');
        }
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
        setError('Failed to load commission members. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      // Return the public path string.
      return FALLBACK_IMAGE_URL;
    }
    return `${API_BASE_URL}/uploads/images/${imagePath}`;
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold text-apsmc-blue mb-6">Our Commission</h1>
        <p className="text-gray-600">Loading members...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold text-apsmc-blue mb-6">Our Commission</h1>
        <p className="text-red-500 bg-red-100 p-4 rounded-md">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center text-apsmc-blue mb-10">
          Organisation Structure
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <div 
              key={member.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                 <img 
                  src={getImageUrl(member.image)} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                  // CORRECTED: The onError fallback now also uses the public path string.
                  onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE_URL; }} 
                />
              </div>
              <div className="p-6 text-center">
                <h2 className="text-xl font-bold text-apsmc-blue">{member.name}</h2>
                <p className="text-md text-gray-700 capitalize">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Organisation;