import { memo, useCallback } from 'react';
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import profilePhoto from "@/assets/profile-photo.jpg";
import KaggleIcon from "@/components/icons/KaggleIcon";

const Hero = memo(() => {
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 sm:px-8 py-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Profile Image - Mobile First */}
          <motion.div 
            className="relative flex justify-center lg:hidden order-first"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <div className="relative">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-3xl opacity-30"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-accent/40 shadow-2xl shadow-accent/20">
                <img 
                  src={profilePhoto} 
                  alt="Abdelrahman Belal Kanakri - Data Scientist & AI Engineer" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            className="space-y-6 lg:space-y-8 text-center lg:text-left"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="space-y-3 lg:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gradient leading-tight">
                Abdelrahman Belal Kanakri
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl text-foreground font-medium">
                Data Scientist & AI Engineer
              </p>
            </div>
            
            <p className="text-base sm:text-lg lg:text-xl text-foreground/80 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Aspiring Data Scientist skilled in <span className="text-accent font-semibold">Python</span>, 
              <span className="text-accent font-semibold"> Machine Learning</span>, 
              <span className="text-accent font-semibold"> NLP</span>, and 
              <span className="text-accent font-semibold"> Data Analytics</span>. 
              Proven ability to develop predictive models, analyze complex datasets, and deliver insights through tools like SQL, Tableau, and Power BI.
            </p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-background font-semibold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => scrollToSection('projects')}
                >
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </motion.div>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-accent text-accent hover:bg-accent hover:text-background font-semibold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-full transition-all duration-300"
                  onClick={() => scrollToSection('contact')}
                >
                  Get in Touch
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex gap-3 sm:gap-4 pt-2 sm:pt-4 justify-center lg:justify-start"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.a 
                href="https://github.com/Abdelrahman-Kanakri/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 rounded-full border border-accent/30 hover:border-accent hover:bg-accent/10 transition-all duration-300 group"
                aria-label="GitHub Profile"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                <Github className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/abdelrahman-kanakri-909654247/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 rounded-full border border-accent/30 hover:border-accent hover:bg-accent/10 transition-all duration-300 group"
                aria-label="LinkedIn Profile"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
              </motion.a>
              <motion.a 
                href="https://www.kaggle.com/aboodai"
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 rounded-full border border-accent/30 hover:border-accent hover:bg-accent/10 transition-all duration-300 group"
                aria-label="Kaggle Profile"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                <KaggleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
              </motion.a>
              <motion.a 
                href="mailto:abdelrahamankanakrik@gmail.com"
                className="p-2.5 sm:p-3 rounded-full border border-accent/30 hover:border-accent hover:bg-accent/10 transition-all duration-300 group"
                aria-label="Email"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Profile Image - Desktop Only */}
          <motion.div 
            className="relative hidden lg:flex justify-end"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
          >
            <div className="relative">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-3xl opacity-30"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-accent/40 shadow-2xl shadow-accent/20">
                <img 
                  src={profilePhoto} 
                  alt="Abdelrahman Belal Kanakri - Data Scientist & AI Engineer" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
