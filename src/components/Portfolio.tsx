import { memo, useState, useEffect, useCallback } from 'react';
import { ExternalLink, Calendar, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

const PROJECTS = [
  {
    title: "Smart Recycling System",
    subtitle: "Graduation Project",
    date: "February 2025",
    description: "Developed a smart recycling system that helps automatically classify waste materials and analyze consumer behavior to promote sustainable practices. Achieved 95% accuracy in waste material classification, ensuring reliable performance in real-world use cases.",
    achievements: [
      "95% accuracy in waste classification",
      "Real-time image recognition using CNN",
      "Consumer behavior analytics dashboard",
      "Automated waste sorting recommendations"
    ],
    tags: ["Deep Learning", "Computer Vision", "Python", "TensorFlow"],
    link: "https://www.kaggle.com/code/aboodai/smart-recycling-resnet50-deepseekr1?scriptVersionId=223514348"
  },
  {
    title: "Diabetes Prediction Model",
    subtitle: "Healthcare AI Project",
    date: "May 2024 - Jun 2024",
    description: "Developed an end-to-end machine learning project to predict the onset of diabetes based on diagnostic health indicators. Implemented multiple classification models achieving 86% test accuracy with XGBoost.",
    achievements: [
      "86% test accuracy with XGBoost model",
      "83.71% cross-validation accuracy",
      "Processed 768 patient records with balanced sampling",
      "Comprehensive model comparison across 5 algorithms"
    ],
    tags: ["Python", "XGBoost", "CatBoost", "Scikit-learn", "Pandas", "NumPy"],
    link: "https://www.kaggle.com/code/aboodai/diabetes-eda-modelling"
  },
  {
    title: "Sport Cars Price Prediction 🏎️",
    subtitle: "Regression Analysis Project",
    date: "2024",
    description: "Engineered a comprehensive machine learning model to accurately predict the market price of sports cars. The Random Forest Regressor achieved an outstanding R² score of 0.9926, demonstrating exceptional predictive power.",
    achievements: [
      "R² score of 0.9926 with Random Forest",
      "Processed 1,007 sports car records",
      "Feature engineering with one-hot encoding",
      "Test RMSE of 0.079 validation"
    ],
    tags: ["Machine Learning", "Random Forest", "Linear Regression", "Pandas", "NumPy", "Seaborn"],
    link: "https://www.kaggle.com/code/aboodai/sport-cars-price-prediction"
  },
  {
    title: "IMDB Top 1000 Movies Analysis",
    subtitle: "Correlation One Fellowship",
    date: "January 2025",
    description: "Analyzed IMDB Top 1000 dataset using data cleaning and feature engineering techniques to uncover patterns and trends influencing movie success, enhancing data-driven decision-making.",
    achievements: [
      "Comprehensive EDA on 1000+ movies",
      "Feature engineering for success prediction",
      "Interactive visualizations with Tableau",
      "Statistical analysis of rating factors"
    ],
    tags: ["Data Analysis", "Feature Engineering", "Pandas", "Tableau"],
    link: "https://www.kaggle.com/code/aboodai/imdb-top-1000-movies"
  },
  {
    title: "Lung Cancer Prediction",
    subtitle: "Medical AI Project",
    date: "May 2025",
    description: "Developed an automated lung cancer detection system using a fine-tuned ResNet50 model to classify medical images. Achieved 91% validation accuracy, demonstrating potential as a reliable 'second opinion' tool for medical professionals.",
    achievements: [
      "91% validation accuracy achieved",
      "Fine-tuned ResNet50 architecture",
      "Medical image classification system",
      "Second opinion tool for healthcare"
    ],
    tags: ["Deep Learning", "Medical AI", "ResNet50", "Computer Vision"],
    link: "https://www.kaggle.com/code/aboodai/lung-cancer-prediction-resnet50-fine-tuning"
  },
  {
    title: "News Category Classification",
    subtitle: "NLP Project",
    date: "July 2025",
    description: "Developed an NLP system to classify over 209,000 news articles into 41 categories using deep learning. Achieved 59% accuracy with a 1D CNN model, showcasing end-to-end text classification.",
    achievements: [
      "Classified 209,000+ news articles",
      "41 category classification system",
      "1D CNN model implementation",
      "59% accuracy on diverse dataset"
    ],
    tags: ["NLP", "Text Classification", "Deep Learning", "1D CNN"],
    link: "https://www.kaggle.com/code/aboodai/news-category-classification"
  },
  {
    title: "Data Scientist Agent",
    subtitle: "AI Automation Project",
    date: "August 2025",
    description: "Developed a custom AI assistant on Telegram to serve as an intuitive data command center, empowering non-technical users to query documents and manage databases using natural language.",
    achievements: [
      "Custom Telegram AI assistant",
      "Natural language database queries",
      "Document querying capabilities",
      "Empowers non-technical users"
    ],
    tags: ["AI Automation", "NLP", "Telegram Bot", "RAG"],
    link: "https://github.com/Abdelrahman-Kanakri/n8n-Automation/tree/main/Data%20Science%20Assistant"
  }
] as const;

const Portfolio = memo(() => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-card/30">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          className="text-center mb-8 sm:mb-10 lg:mb-12 space-y-3 sm:space-y-4"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient">
            Featured Projects
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Showcasing innovative solutions and impactful data-driven projects
          </p>
        </motion.div>

        <div className="relative overflow-visible px-4 sm:px-8 md:px-12 lg:px-16 pt-8 sm:pt-12">
          {/* Navigation Buttons - Side positioned */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="absolute -left-2 sm:-left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-12 sm:w-12 rounded-full border-accent/30 bg-card/90 backdrop-blur-sm text-accent hover:bg-accent hover:text-background transition-all duration-300 shadow-lg"
            aria-label="Previous project"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="absolute -right-2 sm:-right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-12 sm:w-12 rounded-full border-accent/30 bg-card/90 backdrop-blur-sm text-accent hover:bg-accent hover:text-background transition-all duration-300 shadow-lg"
            aria-label="Next project"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>

            <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
              skipSnaps: false,
              dragFree: false,
              containScroll: "trimSnaps",
            }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: true,
              }),
            ]}
            className="w-full"
            style={{ overflow: 'visible' }}
          >
            <CarouselContent className="-ml-2 md:-ml-4 overflow-visible pt-8 pb-8">
              {PROJECTS.map((project, index) => {
                const isCurrent = current === index;
                const distance = Math.abs(current - index);
                
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
                      <Card 
                        className={`border-accent/20 bg-card/50 backdrop-blur-sm group/card overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/20 hover:bg-card/60 ${
                          current === index 
                            ? 'shadow-xl shadow-accent/15 border-accent/30' 
                            : 'shadow-md'
                        }`}
                      >
                      <CardContent className="p-5 sm:p-6 lg:p-8 flex flex-col flex-1">
                        <div className="space-y-4 sm:space-y-5 lg:space-y-6 flex flex-col flex-1">
                          {/* Header */}
                          <div className="space-y-1.5 sm:space-y-2">
                            <div className="flex items-start justify-between gap-3 sm:gap-4">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground group-hover/card:text-accent transition-colors mb-1 line-clamp-2">
                                  {project.title}
                                </h3>
                                <p className="text-accent font-medium text-sm sm:text-base">{project.subtitle}</p>
                              </div>
                              <Award className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-accent flex-shrink-0" />
                            </div>
                            
                            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span>{project.date}</span>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-xs sm:text-sm lg:text-base text-foreground/80 leading-relaxed line-clamp-3 sm:line-clamp-4">
                            {project.description}
                          </p>

                          {/* Achievements */}
                          <div className="space-y-1.5 sm:space-y-2 flex-1">
                            <h4 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wide">
                              Key Achievements
                            </h4>
                            <ul className="space-y-1 sm:space-y-1.5">
                              {project.achievements.map((achievement, idx) => (
                                <li key={idx} className="flex items-start gap-1.5 sm:gap-2">
                                  <span className="text-accent mt-0.5">•</span>
                                  <span className="text-xs sm:text-sm text-foreground/80 leading-relaxed">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {project.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-2 sm:px-2.5 lg:px-3 py-0.5 sm:py-1 bg-accent/10 text-accent border border-accent/20 rounded-full text-[10px] sm:text-xs font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* CTA */}
                          <a 
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block mt-auto"
                          >
                            <Button 
                              variant="outline"
                              className="w-full border-accent/30 text-accent hover:bg-accent hover:text-background transition-all duration-300 group-hover/card:border-accent text-xs sm:text-sm py-2 sm:py-2.5"
                            >
                              View Project
                              <ExternalLink className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              )})}
              
            </CarouselContent>
          </Carousel>

          {/* Dots Indicator - Centered below */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
            {Array.from({ length: count }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  current === index 
                    ? 'w-6 sm:w-8 bg-accent' 
                    : 'w-1.5 sm:w-2 bg-accent/30 hover:bg-accent/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Portfolio.displayName = 'Portfolio';

export default Portfolio;
