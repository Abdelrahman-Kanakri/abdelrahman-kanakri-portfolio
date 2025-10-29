import { useState, memo, useCallback, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Portfolio" },
  { id: "contact", label: "Contact" },
] as const;

const SECTIONS = ["home", "about", "services", "projects", "contact"] as const;

const Navigation = memo(() => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // High-performance scroll tracking with Framer Motion
  const { scrollY } = useScroll();

  // Detect scroll position and direction with Framer Motion useScroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const currentScrollY = latest;
        const previousScrollY = lastScrollY.current;
        
        // Update blur effect state (50px threshold)
        setIsScrolled(currentScrollY > 50);
        
        // Hide-on-scroll logic for mobile ONLY (below lg breakpoint)
        // On mobile: scrolling down hides, scrolling up shows
        if (window.innerWidth < 1024) {
          if (currentScrollY > previousScrollY && currentScrollY > 100) {
            // Scrolling DOWN - hide nav on mobile
            setIsHidden(true);
          } else if (currentScrollY < previousScrollY) {
            // Scrolling UP - show nav
            setIsHidden(false);
          }
        } else {
          // Desktop: always show
          setIsHidden(false);
        }
        
        // Update active section
        updateActiveSection();
        
        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
      ticking.current = true;
    }
  });

  // Active section detection (optimized)
  const updateActiveSection = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      const section = SECTIONS[i];
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop } = element;
        if (scrollPosition >= offsetTop) {
          setActiveSection(section);
          break;
        }
      }
    }
  }, []);

  // Initial active section check
  useEffect(() => {
    updateActiveSection();
  }, [updateActiveSection]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <>
      {/* Desktop Navigation - Always visible sticky header */}
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
              onClick={() => scrollToSection('home')}
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
                  onClick={() => scrollToSection(link.id)}
                  className={`relative text-foreground/80 hover:text-accent font-medium transition-colors duration-300 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full ${
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

      {/* Mobile/Tablet Navigation - Hide on scroll down, show on scroll up */}
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
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.button
              onClick={() => scrollToSection('home')}
              className="text-xl sm:text-2xl font-bold text-gradient"
              whileTap={{ scale: 0.95 }}
            >
              ABK
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-accent" />
              ) : (
                <Menu className="h-6 w-6 text-accent" />
              )}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed inset-0 z-40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Menu Content */}
          <motion.div
            className="absolute top-16 sm:top-20 left-0 right-0 mx-4 sm:mx-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="bg-card/95 backdrop-blur-xl border border-accent/20 rounded-2xl shadow-2xl p-4 sm:p-6">
              <div className="flex flex-col gap-2 sm:gap-3">
                {NAV_LINKS.map((link, index) => (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`text-left px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-medium transition-all duration-300 ${
                      activeSection === link.id
                        ? 'bg-accent text-background shadow-lg shadow-accent/30'
                        : 'bg-accent/5 text-foreground hover:bg-accent/10'
                    }`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
