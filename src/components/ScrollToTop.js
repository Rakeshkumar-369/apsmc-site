// src/components/ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation(); // Get the current path from the URL

  useEffect(() => {
    // Scroll to top on every route change
    window.scrollTo(0, 0);
  }, [pathname]); // Re-run this effect whenever the pathname changes

  return null; // This component doesn't render anything visually
}

export default ScrollToTop;