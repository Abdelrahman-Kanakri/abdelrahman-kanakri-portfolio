import { memo, useState, useCallback, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' }
];

const PageProgress = memo(() => {
  const [activeSection, setActiveSection] = useState(0);
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);
  const ticking = useRef(false);
  
  // High-performance scroll tracking with Framer Motion
  const { scrollY } = useScroll();

  // Use useMotionValueEvent for performant scroll tracking
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const scrollPosition = latest + window.innerHeight / 2;
        
        // Reverse loop for performance (check bottom sections first)
        for (let index = SECTIONS.length - 1; index >= 0; index--) {
          const section = SECTIONS[index];
          const element = document.getElementById(section.id);
          if (element) {
            const { offsetTop } = element;
            if (scrollPosition >= offsetTop) {
              setActiveSection(index);
              break;
            }
          }
        }
        
        ticking.current = false;
      });
      ticking.current = true;
    }
  });

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <motion.div 
      className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-6 items-end"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {SECTIONS.map((section, index) => (
        <div key={section.id} className="flex items-center justify-end gap-4 group w-full relative">
          {/* Tooltip - appears on hover */}
          <AnimatePresence>
            {hoveredDot === section.id && (
              <motion.div
                className="absolute right-full mr-6 bg-card/95 backdrop-blur-sm border border-accent/30 px-3 py-1.5 rounded-lg shadow-lg"
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-sm font-medium text-accent whitespace-nowrap">
                  {section.label}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Dot indicator */}
          <motion.button
            onClick={() => scrollToSection(section.id)}
            onMouseEnter={() => setHoveredDot(section.id)}
            onMouseLeave={() => setHoveredDot(null)}
            className="relative flex items-center justify-center flex-shrink-0"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to ${section.label}`}
          >
            {/* Outer ring for active state - pulsing animation */}
            {activeSection === index && (
              <motion.span 
                className="absolute inset-0 w-full h-full rounded-full border-2 border-accent"
                initial={{ scale: 1, opacity: 0.75 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            )}
            
            {/* Main dot with GPU-accelerated animation */}
            <motion.span 
              className={`block rounded-full transition-shadow duration-300 ${
                activeSection === index 
                  ? 'bg-accent shadow-[0_4px_12px_hsl(var(--accent)/0.5)]' 
                  : 'bg-foreground/30 hover:bg-foreground/50'
              }`}
              animate={{
                width: activeSection === index ? 12 : 8,
                height: activeSection === index ? 12 : 8,
              }}
              transition={{ 
                duration: 0.3,
                ease: "easeInOut"
              }}
              style={{ willChange: 'width, height' }}
            />
          </motion.button>
        </div>
      ))}
    </motion.div>
  );
});

PageProgress.displayName = 'PageProgress';

export default PageProgress;
