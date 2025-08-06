import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  // gets the current page path
  const { pathname } = useLocation();

  useEffect(() => {
    // scroll to top when the page changes
    window.scrollTo(0, 0);
  }, [pathname]);

  // this is a utility component, so it renders nothing
  return null;
}

export default ScrollToTop;