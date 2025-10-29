/**
 * Performance Optimization Utilities
 * Tools for monitoring and optimizing runtime performance
 */

// RAF throttling for scroll/resize handlers
export const rafThrottle = (callback: (...args: any[]) => void) => {
  let rafId: number | null = null;
  let lastArgs: any[] = [];

  const throttled = (...args: any[]) => {
    lastArgs = args;
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        callback(...lastArgs);
        rafId = null;
      });
    }
  };

  throttled.cancel = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  return throttled;
};

// Debounce for expensive operations
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  let timeout: NodeJS.Timeout | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
      timeout = null;
    }, wait);
  };

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
};

// Intersection Observer helper for lazy loading
export const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  const observer = new IntersectionObserver(callback, {
    threshold: 0.1,
    rootMargin: '50px',
    ...options,
  });

  return {
    observe: (element: Element) => observer.observe(element),
    unobserve: (element: Element) => observer.unobserve(element),
    disconnect: () => observer.disconnect(),
  };
};

// GPU acceleration check
export const isGPUAccelerated = (element: HTMLElement): boolean => {
  const style = window.getComputedStyle(element);
  const transform = style.transform;
  const willChange = style.willChange;
  
  return (
    transform !== 'none' ||
    willChange === 'transform' ||
    willChange === 'opacity'
  );
};

// Performance metrics
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`);
};

// Detect reduced motion preference
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// GPU-accelerated style object generator
export const gpuStyles = {
  accelerate: {
    willChange: 'transform, opacity',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden' as const,
  },
  reset: {
    willChange: 'auto',
  },
} as const;
