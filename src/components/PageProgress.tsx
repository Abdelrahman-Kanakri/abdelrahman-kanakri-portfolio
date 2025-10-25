import { memo, useState, useEffect } from 'react';

const PageProgress = memo(() => {
  const [activeSection, setActiveSection] = useState(0);
  
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-6">
      {sections.map((section, index) => (
        <div key={section.id} className="flex items-center gap-4 group">
          {/* Label - appears on hover */}
          <span 
            className={`text-sm font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 ${
              activeSection === index ? 'text-accent' : 'text-foreground/60'
            }`}
          >
            {section.label}
          </span>
          
          {/* Dot indicator */}
          <button
            onClick={() => scrollToSection(section.id)}
            className={`relative transition-all duration-300 ${
              activeSection === index 
                ? 'w-3 h-3' 
                : 'w-2 h-2 hover:w-2.5 hover:h-2.5'
            }`}
            aria-label={`Go to ${section.label}`}
          >
            {/* Outer ring for active state */}
            {activeSection === index && (
              <span className="absolute inset-0 rounded-full border-2 border-accent animate-ping opacity-75" />
            )}
            
            {/* Main dot */}
            <span 
              className={`block w-full h-full rounded-full transition-all duration-300 ${
                activeSection === index 
                  ? 'bg-accent shadow-lg shadow-accent/50' 
                  : 'bg-foreground/30 group-hover:bg-accent/50'
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  );
});

PageProgress.displayName = 'PageProgress';

export default PageProgress;
