import { memo, useState, useEffect, useCallback } from 'react';
import { ExternalLink, Calendar, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Portfolio = memo(() => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const projects = [
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
  ];

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
    <section id="projects" className="py-20 px-6 bg-card/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing innovative solutions and impactful data-driven projects
          </p>
        </div>

        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {projects.map((project, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      current === index 
                        ? 'scale-105 opacity-100' 
                        : 'scale-95 opacity-60 blur-[1px]'
                    }`}
                  >
                    <Card 
                      className={`border-accent/20 bg-card/50 backdrop-blur-sm group/card overflow-hidden transition-all duration-500 h-full ${
                        current === index 
                          ? 'shadow-2xl shadow-accent/20 border-accent/40' 
                          : 'hover:scale-100 hover:opacity-80'
                      }`}
                    >
                      <CardContent className="p-8">
                        <div className="space-y-6">
                          {/* Header */}
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="text-2xl font-bold text-foreground group-hover/card:text-accent transition-colors mb-1">
                                  {project.title}
                                </h3>
                                <p className="text-accent font-medium">{project.subtitle}</p>
                              </div>
                              <Award className="h-8 w-8 text-accent flex-shrink-0" />
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>{project.date}</span>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-foreground/80 leading-relaxed">
                            {project.description}
                          </p>

                          {/* Achievements */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                              Key Achievements
                            </h4>
                            <ul className="space-y-2">
                              {project.achievements.map((achievement, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-accent mt-1">•</span>
                                  <span className="text-sm text-foreground/80">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded-full text-xs font-medium"
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
                            className="block"
                          >
                            <Button 
                              variant="outline"
                              className="w-full border-accent/30 text-accent hover:bg-accent hover:text-background transition-all duration-300 group-hover/card:border-accent"
                            >
                              View Project
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Custom Navigation Controls */}
          <div className="flex items-center justify-center gap-8 mt-12">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="h-12 w-12 rounded-full border-accent/30 text-accent hover:bg-accent hover:text-background transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            {/* Dots Indicator */}
            <div className="flex gap-2">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    current === index 
                      ? 'w-8 bg-accent' 
                      : 'w-2 bg-accent/30 hover:bg-accent/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="h-12 w-12 rounded-full border-accent/30 text-accent hover:bg-accent hover:text-background transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});

Portfolio.displayName = 'Portfolio';

export default Portfolio;
