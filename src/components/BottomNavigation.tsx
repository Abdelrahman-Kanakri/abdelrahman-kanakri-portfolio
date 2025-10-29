import { memo, useCallback, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, FolderOpen, Mail } from 'lucide-react';
import clsx from 'clsx';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'services', label: 'Services', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'contact', label: 'Contact', icon: Mail },
] as const;

type NavItemId = (typeof NAV_ITEMS)[number]['id'];

const BottomNavigation = memo(() => {
  const [activeSection, setActiveSection] = useState<NavItemId>('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        let maxRatio = 0;
        let activeEntry: IntersectionObserverEntry | null = null;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            activeEntry = entry;
          }
        });

        // Update active section only if we found a highly visible section
        if (activeEntry && maxRatio > 0.1) {
          setActiveSection(activeEntry.target.id as NavItemId);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '-20% 0px -50% 0px',
      }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((id: NavItemId) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      {/* Glass morphism background */}
      <div className="bg-card/90 backdrop-blur-xl border-t border-accent/20 shadow-2xl">
        <div className="flex items-center justify-around px-2 py-2 safe-area-bottom">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative flex flex-col items-center justify-center flex-1 py-2.5 px-1 min-w-0"
                whileTap={{ scale: 0.85 }}
                animate={{
                  scale: isActive ? 1.05 : 0.95,
                }}
                transition={{ duration: 0.2 }}
              >
                {/* Active indicator background */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-accent/15 rounded-2xl border border-accent/30"
                      layoutId="activeTab"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        type: 'tween',
                        ease: 'easeInOut',
                        duration: 0.3,
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Icon */}
                <motion.div
                  className="relative"
                  animate={{
                    y: isActive ? -2 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon
                    className={clsx(
                      'h-6 w-6 transition-colors duration-200',
                      isActive
                        ? 'text-accent drop-shadow-[0_0_8px_hsl(var(--accent)/0.5)]'
                        : 'text-foreground/60'
                    )}
                  />

                  {/* Active dot indicator */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Label */}
                <motion.span
                  className={clsx(
                    'text-[11px] font-semibold mt-1 transition-colors duration-200',
                    isActive ? 'text-accent' : 'text-foreground/50'
                  )}
                  animate={{
                    opacity: isActive ? 1 : 0.6,
                    scale: isActive ? 1.05 : 0.9,
                    fontWeight: isActive ? 700 : 500,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
});

BottomNavigation.displayName = 'BottomNavigation';

export default BottomNavigation;
