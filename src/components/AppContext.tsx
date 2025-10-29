import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

// ---
// 1. DEFINE THE IDS FOR ALL YOUR SECTIONS
// ---
const SECTION_IDS = ['home', 'about', 'services', 'projects', 'contact'] as const;
type SectionId = (typeof SECTION_IDS)[number];

// ---
// 2. CREATE THE CONTEXT
// ---
interface AppContextType {
  activeSection: SectionId;
  scrollToSection: (id: SectionId, offset?: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// ---
// 3. CREATE THE PROVIDER COMPONENT
// ---
// This component will wrap your entire page in App.tsx
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const ticking = useRef(false);
  const { scrollY } = useScroll();

  // ---
  // 4. THE *SINGLE* LOGIC FOR SCROLL-SPY
  // ---
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        // Use innerHeight / 3 to make the trigger point higher up on the screen
        const scrollPosition = latest + window.innerHeight / 3;

        // Reverse loop for performance
        for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
          const id = SECTION_IDS[i];
          const element = document.getElementById(id);
          if (element) {
            const { offsetTop } = element;
            if (scrollPosition >= offsetTop) {
              setActiveSection(id);
              break;
            }
          }
        }
        ticking.current = false;
      });
      ticking.current = true;
    }
  });

  // ---
  // 5. THE *SINGLE* LOGIC FOR SCROLL-TO-SECTION
  // ---
  const scrollToSection = (id: SectionId, offset: number = 80) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const value = { activeSection, scrollToSection };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// ---
// 6. CREATE A HOOK FOR EASY USE
// ---
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
