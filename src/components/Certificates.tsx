import { Award, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const CERTIFICATES = [
  {
    name: "Tech for Jobs Advanced Data Analytics Program",
    issuer: "Correlation One",
    date: "March 2025",
    category: "Data Analytics"
  },
  {
    name: "Automation and AI Agent Training Course",
    issuer: "Robotna",
    date: "September 2025",
    category: "AI & Automation"
  },
  {
    name: "IC3 Digital Literacy Certification",
    issuer: "Certiport",
    date: "May 2025",
    category: "Digital Literacy"
  },
  {
    name: "The Data Science Course: Complete Bootcamp 2024",
    issuer: "Udemy (365 Careers)",
    date: "July 2024",
    category: "Data Science"
  },
  {
    name: "Machine Learning",
    issuer: "Simplilearn",
    date: "August 2023",
    category: "Machine Learning"
  },
  {
    name: "Machine Learning Part 2",
    issuer: "Unihance",
    date: "July 2023",
    category: "Machine Learning"
  },
  {
    name: "Statistics for Data Science and AI",
    issuer: "Unihance",
    date: "July 2023",
    category: "Statistics"
  },
  {
    name: "Machine Learning Part 1",
    issuer: "Unihance",
    date: "June 2023",
    category: "Machine Learning"
  },
  {
    name: "Modelling in Data Science",
    issuer: "Unihance",
    date: "April 2023",
    category: "Data Science"
  },
  {
    name: "Statistics for Business Analytics & Data Science",
    issuer: "Unihance",
    date: "January 2023",
    category: "Statistics"
  },
  {
    name: "Python For Data Science (Part 2)",
    issuer: "Unihance",
    date: "July 2022",
    category: "Python"
  },
  {
    name: "Python For Data Science (Part 1)",
    issuer: "Unihance",
    date: "June 2022",
    category: "Python"
  },
  {
    name: "Introduction to Artificial Intelligence",
    issuer: "Unihance",
    date: "June 2022",
    category: "AI"
  }
];

const Certificates = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.5,
      z: -400,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      z: 0,
    },
    exit: (direction: number) => ({
      rotateY: direction < 0 ? 90 : -90,
      opacity: 0,
      scale: 0.5,
      z: -400,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = CERTIFICATES.length - 1;
      if (nextIndex >= CERTIFICATES.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const currentCert = CERTIFICATES[currentIndex];

  return (
    <section id="certificates" className="py-12 sm:py-16 lg:py-20 px-4 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-10 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient">
            Certificates & Achievements
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and accomplishments
          </p>
        </motion.div>

        <div className="relative flex items-center justify-center" style={{ perspective: "2000px" }}>
          {/* Previous Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => paginate(-1)}
            className="absolute left-0 z-10 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border-accent/20 hover:border-accent/40 hover:bg-accent/10"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          {/* 3D Carousel */}
          <div className="relative w-full max-w-md h-[500px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  rotateY: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                }}
                className="absolute w-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Card className="border-accent/20 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10 group">
                  <CardHeader className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="p-3 bg-accent/10 rounded-lg transition-all duration-300 group-hover:bg-accent/20">
                        <Award className="h-6 w-6 text-accent" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {currentCert.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {currentCert.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {currentCert.issuer}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t border-accent/10">
                      <Calendar className="h-4 w-4" />
                      <span>{currentCert.date}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => paginate(1)}
            className="absolute right-0 z-10 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border-accent/20 hover:border-accent/40 hover:bg-accent/10"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {CERTIFICATES.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-accent"
                  : "w-2 bg-accent/30 hover:bg-accent/50"
              }`}
              aria-label={`Go to certificate ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
