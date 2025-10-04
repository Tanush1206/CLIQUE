import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      // Also reset any scrollable containers if needed
      const el = document.scrollingElement || document.documentElement;
      if (el) el.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}


