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

const Certificates = memo(() => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
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
    <section id="certificates" className="py-12 sm:py-16 lg:py-20 px-4">
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
          
          {/* Dynamic Certificate Counter */}
          <motion.div 
            className="text-2xl sm:text-3xl font-semibold text-accent mt-6"
            key={current}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            My {current} Certificate
          </motion.div>
        </motion.div>

        <div className="relative px-12 sm:px-16">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {CERTIFICATES.map((cert, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full"
                  >
                    <Card className="border-accent/20 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10 h-full group">
                      <CardHeader className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="p-3 bg-accent/10 rounded-lg transition-all duration-300 group-hover:bg-accent/20">
                            <Award className="h-6 w-6 text-accent" />
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {cert.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold text-foreground line-clamp-2">
                            {cert.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {cert.issuer}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t border-accent/10">
                          <Calendar className="h-4 w-4" />
                          <span>{cert.date}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border-accent/20 hover:border-accent/40 hover:bg-accent/10 transition-all duration-300"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border-accent/20 hover:border-accent/40 hover:bg-accent/10 transition-all duration-300"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current - 1
                  ? "w-8 bg-accent"
                  : "w-2 bg-accent/30 hover:bg-accent/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

Certificates.displayName = 'Certificates';

export default Certificates;
