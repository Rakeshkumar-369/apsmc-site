import React, { useState, useEffect } from 'react';

function AnnouncementBar() {
  // --- NEW: State for fetching messages from the API ---
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- NEW: Fetch data from the API when the component loads ---
  useEffect(() => {
    fetch('http://10.0.0.195:5000/news')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch announcements');
        }
        return response.json();
      })
      .then(data => {
        // Extract just the titles for the marquee
        const titles = data.newsItems.map(item => item.title);
        setMessages(titles);
      })
      .catch(error => {
        console.error("Error fetching news:", error);
        // Set a fallback message on error so the bar doesn't break
        setError("Could not load announcements.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // Empty array ensures this runs only once

  // --- MODIFIED: Logic to handle loading, error, and successful fetch ---
  let marqueeText;
  if (loading) {
    marqueeText = "Loading latest announcements...";
  } else if (error) {
    marqueeText = error;
  } else if (messages.length === 0) {
    marqueeText = "No current announcements.";
  } else {
    // Original logic to join messages for the marquee scroll
    marqueeText = messages.join(" \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ");
  }

  // --- Your original, unchanged JSX layout ---
  return (
    <div className="bg-white shadow-md py-2 px-4 overflow-hidden relative">
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

        .marquee-container:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="marquee-container text-apsmc-primary text-sm font-medium">
        <span>{marqueeText}</span>
        <span>{marqueeText}</span>
      </div>
    </div>
  );
}

export default AnnouncementBar;