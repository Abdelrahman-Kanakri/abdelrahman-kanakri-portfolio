import { useState, memo, useCallback, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
// --- FIX: Corrected import path for context hook ---
import { useAppContext } from "./AppContext";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Portfolio" }, // This label is "Portfolio" but id is "projects", which is correct
  { id: "contact", label: "Contact" },
] as const;

type SectionId = (typeof NAV_LINKS)[number]['id'];

const Navigation = memo(() => {
  // --- FIX: Get state and functions from our context ---
  const { activeSection, scrollToSection } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const { scrollY } = useScroll();

  // This logic is just for hiding the nav on scroll, so it's fine to keep it.
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const currentScrollY = latest;
        const previousScrollY = lastScrollY.current;
        
        setIsScrolled(currentScrollY > 50);
        
        if (window.innerWidth < 1024) {
          if (currentScrollY > previousScrollY && currentScrollY > 100) {
            setIsHidden(true);
          } else if (currentScrollY < previousScrollY) {
            setIsHidden(false);
          }
        } else {
          setIsHidden(false);
        }
        
        // --- Active section detection is REMOVED (handled in context) ---
        
        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
      ticking.current = true;
    }
  });

  // --- FIX: Create a simple handler to call context function ---
  const handleScroll = (id: SectionId) => {
    scrollToSection(id, 80); // 80px offset for desktop nav
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 hidden lg:block transition-colors duration-300 ${
          isScrolled
            ? 'bg-card/90 backdrop-blur-md shadow-lg border-b border-border'
            : 'bg-transparent'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.button
              onClick={() => handleScroll('home')}
              className="text-2xl font-bold text-gradient hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ABK
            </motion.button>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <motion.button
                  key={link.id}
                  onClick={() => handleScroll(link.id)}
                  className={`relative text-foreground/80 hover:text-accent font-medium transition-colors duration-300 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full ${
                    // Active state now comes from context
                    activeSection === link.id ? 'text-accent after:w-full' : ''
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile/Tablet Navigation - Simplified (no hamburger menu) */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 lg:hidden transition-colors duration-300 ${
          isScrolled
            ? 'bg-card/90 backdrop-blur-md shadow-lg border-b border-border'
            : 'bg-transparent'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: 1,
          y: isHidden ? -100 : 0,
        }}
        transition={{
          opacity: { duration: 0.3 },
          y: { duration: 0.3, ease: 'easeInOut' }
        }}
        style={{ willChange: 'transform' }}
      >
        <nav className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center h-16 sm:h-20">
            {/* Logo - Centered */}
            <motion.button
              onClick={() => handleScroll('home')}
              className="text-xl sm:text-2xl font-bold text-gradient"
              whileTap={{ scale: 0.95 }}
            >
              ABK
            </motion.button>
          </div>
        </nav>
      </motion.header>
    </>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;

