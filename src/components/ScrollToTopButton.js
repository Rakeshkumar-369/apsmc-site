import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

function ScrollToTopButton() {
  // tracks if the button should be visible
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // show the button if we've scrolled down 300px
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    // check scroll position
    window.addEventListener('scroll', toggleVisibility);
    
    // cleanup the listener
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []); // runs only once

  // scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    // only render if visible
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-blue-900 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition"
        data-aos="fade-up" // animation
        aria-label="Scroll to top" // for accessibility
      >
        <FaArrowUp />
      </button>
    )
  );
}

export default ScrollToTopButton;