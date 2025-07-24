// AnnouncementBar.js
import React from 'react';

function AnnouncementBar() {
  // Hardcoded announcements for now; these will eventually be fetched from an API.
  const messages = [
    "🎓 Scholarship applications open till 31st July. Apply now!",
    "🎉 New welfare schemes launched for minority communities!",
    "🗓️ Important meeting on August 15th at Secretariat Building.",
    "💡 Empowering youth through skill development programs!"
  ];

  // Prepare text for the continuous marquee scroll
  const marqueeText = messages.join(" \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ");

  return (
    <div className="bg-white shadow-md py-2 px-4 overflow-hidden relative">
      {/* Custom CSS for marquee effect */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); } /* Scrolls content by half its total width for seamless loop */
        }

        .marquee-container {
          display: flex;
          width: fit-content; /* Ensure container size fits content for accurate animation */
          white-space: nowrap;
          animation: marquee 40s linear infinite; /* Control scroll speed and repetition */
        }

        .marquee-container:hover {
          animation-play-state: paused; /* User-friendly pause on hover */
        }
      `}</style>

      {/* Duplicating content to create an infinite scroll effect */}
      <div className="marquee-container text-apsmc-primary text-sm font-medium">
        <span>{marqueeText}</span>
        <span>{marqueeText}</span>
      </div>
    </div>
  );
}

export default AnnouncementBar;