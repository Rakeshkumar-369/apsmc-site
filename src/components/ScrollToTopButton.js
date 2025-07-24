import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

function ScrollToTopButton() {
  // State to control the visibility of the scroll-to-top button
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Function to show/hide the button based on scroll position
    const toggleVisibility = () => {
      if (window.scrollY > 300) { // Button appears after scrolling down 300px
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    // Add and clean up scroll event listener to manage button visibility
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Smoothly scrolls the window to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    // Render the button only when 'visible' state is true
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-blue-900 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition"
        data-aos="fade-up" // AOS animation for button appearance
        aria-label="Scroll to top" // Accessibility label for screen readers
      >
        <FaArrowUp />
      </button>
    )
  );
}

export default ScrollToTopButton;