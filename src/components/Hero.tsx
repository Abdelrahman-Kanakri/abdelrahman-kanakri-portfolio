import { memo } from 'react';
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import profilePhoto from "@/assets/profile-photo.jpg";
import KaggleIcon from "@/components/icons/KaggleIcon";

const Hero = memo(() => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-gradient leading-tight">
                Abdelrahman Belal Kanakri
              </h1>
              <p className="text-2xl md:text-3xl text-foreground font-medium">
                Data Scientist & AI Engineer
              </p>
            </div>
            
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-2xl">
              Aspiring Data Scientist skilled in <span className="text-accent font-semibold">Python</span>, 
              <span className="text-accent font-semibold"> Machine Learning</span>, 
              <span className="text-accent font-semibold"> NLP</span>, and 
              <span className="text-accent font-semibold"> Data Analytics</span>. 
              Proven ability to develop predictive models, analyze complex datasets, and deliver insights through tools like SQL, Tableau, and Power BI.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-background font-semibold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105"
                onClick={() => scrollToSection('projects')}
              >
                View My Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-accent text-accent hover:bg-accent hover:text-background font-semibold text-lg px-8 py-6 rounded-full transition-all duration-500 hover:scale-105"
                onClick={() => scrollToSection('contact')}
              >
                Get in Touch
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a 
                href="https://github.com/Abdelrahman-Kanakri/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-accent/30 hover:border-accent hover:bg-accent/10 transition-all duration-500 group"
                aria-label="GitHub Profile"
              >
                <Github className="h-6 w-6 text-accent group-hover:scale-110 transition-transform duration-500" />
              </a>
              <a 
                href="https://www.linkedin.com/in/abdelrahman-kanakri-909654247/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-accent/30 hover:border-accent hover:bg-accent/10 transition-all duration-500 group"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-6 w-6 text-accent group-hover:scale-110 transition-transform duration-500" />
              </a>
              <a 
                href="https://www.kaggle.com/aboodai"
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-accent/30 hover:border-accent hover:bg-accent/10 transition-all duration-500 group"
                aria-label="Kaggle Profile"
              >
                <KaggleIcon className="h-6 w-6 text-accent group-hover:scale-110 transition-transform duration-500" />
              </a>
              <a 
                href="mailto:abdelrahamankanakrik@gmail.com"
                className="p-3 rounded-full border border-accent/30 hover:border-accent hover:bg-accent/10 transition-all duration-500 group"
                aria-label="Email"
              >
                <Mail className="h-6 w-6 text-accent group-hover:scale-110 transition-transform duration-500" />
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-3xl opacity-40 animate-glow-pulse"></div>
              <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-accent/40 shadow-2xl shadow-accent/20">
                <img 
                  src={profilePhoto} 
                  alt="Abdelrahman Belal Kanakri - Data Scientist & AI Engineer" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
