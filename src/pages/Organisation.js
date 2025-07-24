import React from 'react';
import { Link } from 'react-router-dom'; // For internal navigation within the app

const members = [
  // Hardcoded member data for now; consider fetching this dynamically from an API later
  {
    name: 'Mr. A. Rahman',
    role: 'Chairman',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: 'Ms. S. Fatima',
    role: 'Vice Chairperson',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: 'Dr. K. Rao',
    role: 'Member Secretary',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: 'Mr. M. Yousuf',
    role: 'Legal Advisor',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: 'Ms. J. Begum',
    role: 'Welfare Coordinator',
    image: 'https://via.placeholder.com/150'
  }
];

function Organisation() {
  return (
    <div className="bg-apsmc-light py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className="text-3xl md:text-4xl font-bold text-apsmc-primary mb-12"
          data-aos="fade-up"
        >
          Organisation Members
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {members.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition"
              data-aos="zoom-in"
              data-aos-delay={index * 100} // Staggered animation for each member card
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold text-apsmc-primary">{member.name}</h3>
              <p className="text-gray-600 text-sm">{member.role}</p>
            </div>
          ))}

          {/* Dedicated card linking to the full Administration Structure page */}
          <Link
            to="/administration-structure"
            className="bg-apsmc-primary rounded-lg p-6 shadow hover:shadow-lg transition flex flex-col items-center justify-center text-white font-semibold text-center cursor-pointer"
            data-aos="zoom-in"
            data-aos-delay={members.length * 100} // Ensures this card animates after all member cards
            style={{ minHeight: '180px' }} // Helps maintain consistent card height in the grid
          >
            {/* Visual icon representing structure/organization */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mb-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            <h3 className="text-xl">Administration Structure</h3>
            <p className="text-sm text-gray-100 mt-1">Click to view details</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Organisation;