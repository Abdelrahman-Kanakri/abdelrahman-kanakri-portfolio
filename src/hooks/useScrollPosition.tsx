import { useState, useEffect, useCallback } from 'react';

export const useScrollPosition = (threshold: number = 50) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > threshold;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
    }
  }, [threshold, isScrolled]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return isScrolled;
};
