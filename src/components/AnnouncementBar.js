import React from 'react';

function AnnouncementBar() {
  // Hardcoded for now. Should be fetched from the API later.
  const messages = [
    "🎓 Scholarship applications open till 31st July. Apply now!",
    "🎉 New welfare schemes launched for minority communities!",
    "🗓️ Important meeting on August 15th at Secretariat Building.",
    "💡 Empowering youth through skill development programs!"
  ];

  // join messages together for the marquee scroll
  const marqueeText = messages.join(" \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ");

  return (
    <div className="bg-white shadow-md py-2 px-4 overflow-hidden relative">
      {/* Simple marquee effect using CSS animations.
        The container width is set to fit the content, and then we scroll it
        by 50% of its total width to make the loop seamless.
      */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .marquee-container {
          display: flex;
          width: fit-content;
          white-space: nowrap;
          animation: marquee 40s linear infinite;
        }

        /* pause the animation on hover for better UX */
        .marquee-container:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* We duplicate the content to create the infinite scroll illusion */}
      <div className="marquee-container text-apsmc-primary text-sm font-medium">
        <span>{marqueeText}</span>
        <span>{marqueeText}</span>
      </div>
    </div>
  );
}

export default AnnouncementBar;