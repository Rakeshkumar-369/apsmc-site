import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AnnouncementBar from '../components/AnnouncementBar';

function Home() {
  const [showHeroDetails, setShowHeroDetails] = useState(false);
  const navigate = useNavigate();

  const whatWeDoItems = [
    { icon: "📑", title: "Policy Guidance", desc: "We recommend reforms and inclusive policies that safeguard minority rights across Andhra Pradesh." },
    { icon: "⚖️", "title": "Legal Support", desc: "APSMC provides legal aid and resolves grievances to uphold justice for minority communities." },
    { icon: "🏫", title: "Welfare Initiatives", desc: "We promote education, employment, and targeted welfare schemes among minority groups." },
  ];

  // handleSchemeClick is now NOT needed for direct navigation from Home, but useful inside sub-pages
  // const handleSchemeClick = (pdfFileName) => {
  //   const pdfPath = `/pdfs/${pdfFileName}`;
  //   navigate('/view-pdf', { state: { pdf: pdfPath } });
  // };

  return (
    <div>
      <AnnouncementBar />

      <div className="relative bg-apsmc-primary text-white py-28 px-6 min-h-[400px]" data-aos="fade-up">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 drop-shadow-lg">
            Empowering Andhra Pradesh's Minority Communities
          </h1>
          <p className="text-lg md:text-xl font-light mb-8 max-w-3xl mx-auto">
            The Andhra Pradesh State Minorities Commission (APSMC) is committed to inclusive development, equal opportunity, and safeguarding rights for all minority groups.
          </p>

          {showHeroDetails && (
            <div className="mt-12">
              <h3 className="text-3xl font-bold text-white mb-8">What We Do</h3>
              <div className="grid md:grid-cols-3 gap-x-8 gap-y-6 text-left">
                {whatWeDoItems.map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <span className="text-3xl mr-3 flex-shrink-0">{item.icon}</span>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1 leading-tight">{item.title}</h4>
                      <p className="text-gray-200 text-sm leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowHeroDetails(!showHeroDetails)}
                className="bg-white hover:bg-gray-100 text-apsmc-primary font-semibold px-8 py-3 rounded-md shadow-md transition duration-300 mt-12"
              >
                Hide Details
              </button>
            </div>
          )}

          {!showHeroDetails && (
            <button
              onClick={() => setShowHeroDetails(!showHeroDetails)}
              className="bg-white hover:bg-gray-100 text-apsmc-primary font-semibold px-8 py-3 rounded-md shadow-md transition duration-300"
            >
              More About APSMC
            </button>
          )}
        </div>
      </div>

      {/* Chairman's Message */}
      <div className="bg-apsmc-light py-20 px-6" data-aos="fade-up">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden shadow">
            <img src="https://via.placeholder.com/400x300?text=Chairman" alt="Chairman" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-apsmc-primary mb-4">Message from the Chairman</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              “At the APSMC, our unwavering mission is to promote equity, uphold dignity, and empower minority communities across the state. We believe in inclusive progress and a future where every citizen has equal access to opportunities, education, and justice.”
            </p>
            <p className="text-apsmc-primary font-semibold">– Mr. A. Rahman, Chairman</p>
          </div>
        </div>
      </div>


      {/* Schemes & Programs */}
      <div className="bg-apsmc-light py-20 px-6" data-aos="fade-up">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-apsmc-primary mb-12">Schemes & Programs</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {[
              // Reverted back to Link component and path property
              { icon: "📘", title: "Acts & Rules", path: "/acts-rules" },
              { icon: "📜", title: "Circulars & Orders", path: "/circulars-orders" },
              { icon: "👥", title: "Population Data", path: "/population" },
              { icon: "📢", title: "Tenders", path: "/tenders" },
              { icon: "🎓", title: "Scholarships", path: "/scholarships" },
              { icon: "📊", title: "Budget", path: "/budget" },
            ].map((item, i) => (
              <Link // <--- CHANGED: Back to Link component
                key={i}
                to={item.path} // <--- CHANGED: Use item.path
                className="bg-white hover:bg-green-50 rounded-xl shadow p-6 transition duration-300 flex flex-col items-center"
              >
                <div className="text-apsmc-primary text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold text-apsmc-primary">{item.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="bg-apsmc-light py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-apsmc-primary mb-12">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="rounded overflow-hidden shadow hover:shadow-lg transition">
                <img src={`https://via.placeholder.com/300x200?text=Photo+${i}`} alt={`Gallery ${i}`} className="w-full h-40 object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;