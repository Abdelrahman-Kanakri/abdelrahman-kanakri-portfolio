import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import PageProgress from "@/components/PageProgress";
import BottomNavigation from "@/components/BottomNavigation";

// Lazy load heavy components
const About = lazy(() => import("@/components/About"));
const Services = lazy(() => import("@/components/Services"));
const Portfolio = lazy(() => import("@/components/Portfolio"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Desktop Navigation - Only on large screens */}
      <Navigation />
      
      {/* Desktop Progress Indicator - Only on large screens */}
      <PageProgress />
      
      {/* Main Content */}
      <main className="pt-16 sm:pt-20 lg:pt-20 pb-20 lg:pb-0">
        <Hero />
        <Suspense fallback={<div className="h-screen flex items-center justify-center">
          <motion.div
            className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>}>
          <About />
          <Services />
          <Portfolio />
          <Contact />
        </Suspense>
      </main>
      
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      
      {/* Mobile Bottom Navigation - Only on small/medium screens */}
      <BottomNavigation />
    </div>
  );
};

export default Index;
