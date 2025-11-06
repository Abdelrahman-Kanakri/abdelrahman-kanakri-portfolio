import { Award, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback, memo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";

const CERTIFICATES = [
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
    name: "Tech for Jobs Advanced Data Analytics Program",
    issuer: "Correlation One",
    date: "March 2025",
    category: "Data Analytics"
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

const Certificates = memo(() => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  return (
    <section id="certificates" className="py-12 sm:py-16 lg:py-20 px-6 sm:px-8 bg-card/30">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          className="text-center mb-8 sm:mb-10 lg:mb-12 space-y-3 sm:space-y-4"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient">
            Certificates & Achievements
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Professional certifications and accomplishments
          </p>
          
          {/* Dynamic Certificate Counter with Slide Animation */}
          <div className="relative h-12 sm:h-14 flex items-center justify-center gap-1 mt-6">
            <span className="text-2xl sm:text-3xl font-semibold text-accent">My</span>
            <div className="relative w-6 sm:w-10 h-12 sm:h-14 flex items-center justify-center overflow-hidden">
              <motion.span
                className="text-2xl sm:text-3xl font-semibold text-accent absolute"
                key={current}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
              >
                {current}
              </motion.span>
            </div>
            <span className="text-2xl sm:text-3xl font-semibold text-accent">Certificate</span>
          </div>
        </motion.div>

        <div className="relative overflow-visible px-4 sm:px-8 md:px-12 lg:px-16 pt-8 sm:pt-12">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="absolute -left-2 sm:-left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 h-10 w-16 sm:h-12 sm:w-20 rounded-full border-accent/30 bg-card/90 backdrop-blur-sm text-accent hover:bg-accent hover:text-background transition-all duration-300 shadow-lg"
            aria-label="Previous certificate"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="absolute -right-2 sm:-right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 h-10 w-16 sm:h-12 sm:w-20 rounded-full border-accent/30 bg-card/90 backdrop-blur-sm text-accent hover:bg-accent hover:text-background transition-all duration-300 shadow-lg"
            aria-label="Next certificate"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>

          <Carousel 
            setApi={setApi} 
            className="w-full"
            style={{ overflow: 'visible' }}
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4 overflow-visible pt-8 pb-8">
              {CERTIFICATES.map((cert, index) => {
                const isCurrent = current - 1 === index;
                const distance = Math.abs(current - 1 - index);
                
                return (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-full md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      className="h-full"
                      animate={{
                        scale: isCurrent ? 1.05 : Math.max(0.90 - distance * 0.03, 0.85),
                        opacity: isCurrent ? 1 : Math.max(0.6 - distance * 0.1, 0.4),
                        filter: isCurrent ? 'blur(0px)' : `blur(${Math.min(distance * 0.5, 1)}px)`,
                      }}
                      whileHover={{ 
                        scale: isCurrent ? 1.06 : 0.92,
                        y: -3,
                        transition: { duration: 0.25, ease: "easeOut" }
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ 
                        scale: { duration: 0.4, ease: "easeOut" },
                        opacity: { duration: 0.4, ease: "easeOut" },
                        filter: { duration: 0.4, ease: "easeOut" },
                      }}
                    >
                      <Card className={`border-accent/20 bg-card/50 backdrop-blur-sm group/card overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/20 hover:bg-card/60 ${
                        isCurrent 
                          ? 'shadow-xl shadow-accent/15 border-accent/30' 
                          : 'shadow-md'
                      }`}>
                        <CardContent className="p-5 sm:p-6 lg:p-8 flex flex-col flex-1">
                          <div className="space-y-4 sm:space-y-5 lg:space-y-6 flex flex-col flex-1">
                            {/* Header */}
                            <div className="space-y-1.5 sm:space-y-2">
                              <div className="flex items-start justify-between gap-3 sm:gap-4">
                                <div className="p-3 bg-accent/10 rounded-lg transition-all duration-300 group-hover/card:bg-accent/20">
                                  <Award className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-accent" />
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  {cert.category}
                                </Badge>
                              </div>
                            </div>

                            {/* Certificate Name */}
                            <div className="space-y-2">
                              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground group-hover/card:text-accent transition-colors line-clamp-2">
                                {cert.name}
                              </h3>
                              <p className="text-accent font-medium text-sm sm:text-base">
                                {cert.issuer}
                              </p>
                            </div>

                            {/* Date */}
                            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground pt-2 border-t border-accent/10 mt-auto">
                              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span>{cert.date}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-1.5 sm:gap-2 mt-8 sm:mt-10">
          {Array.from({ length: count }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                index === current - 1
                  ? "w-6 sm:w-8 bg-accent"
                  : "w-1.5 sm:w-2 bg-accent/30 hover:bg-accent/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

Certificates.displayName = 'Certificates';

export default Certificates;
