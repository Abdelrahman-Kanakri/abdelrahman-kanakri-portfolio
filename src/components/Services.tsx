import { memo } from 'react';
import { motion } from 'framer-motion';
import { Brain, Database, LineChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SERVICES = [
  {
    icon: Brain,
    title: "AI Model Development",
    description: "Architecting and deploying end-to-end machine learning solutions. I specialize in creating custom models, from CNNs and RNNs to fine-tuned LLMs, that solve critical business problems and drive tangible results.",
    features: [
      "Custom CNN architectures for computer vision",
      "RNN & LSTM models for sequence prediction",
      "Fine-tuned LLMs for natural language tasks",
      "Transfer learning implementation"
    ]
  },
  {
    icon: Database,
    title: "Data Science Solutions",
    description: "From data cleaning and exploratory analysis (EDA) to creating insightful dashboards, I provide end-to-end data solutions that drive informed decision-making.",
    features: [
      "Data cleaning and preprocessing",
      "Exploratory Data Analysis (EDA)",
      "Feature engineering and selection",
      "Statistical modeling and hypothesis testing"
    ]
  },
  {
    icon: LineChart,
    title: "AI Automation Systems",
    description: "Designing and implementing AI-driven automation systems using tools like n8n. I integrate custom RAG models to streamline complex business workflows, reducing manual processing time by 25% and enhancing the factual accuracy of AI-generated outputs.",
    features: [
      "Workflow automation with n8n",
      "Custom RAG model integration",
      "Business process optimization",
      "25% reduction in manual processing time"
    ]
  }
] as const;

const Services = memo(() => {

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          className="text-center mb-10 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient">
            AI & Data Science Solutions
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Empowering businesses with intelligent solutions and data-driven strategies
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 justify-items-center px-4">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="w-full max-w-md"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -6 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="border-accent/20 bg-card/50 backdrop-blur-sm group hover:bg-card/70 h-full transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10">
                  <CardContent className="p-5 sm:p-6 lg:p-8 h-full flex flex-col">
                  <div className="mb-4 sm:mb-6">
                    <div className="inline-block p-3 sm:p-4 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors">
                      <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-accent" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-foreground/80 mb-4 sm:mb-6 flex-grow leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2 sm:space-y-3">
                    {service.features.map((feature, idx) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-start gap-2 text-xs sm:text-sm"
                        initial={{ x: -10, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <span className="text-accent mt-0.5 sm:mt-1 text-base sm:text-lg">•</span>
                        <span className="text-foreground/80 leading-relaxed">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

Services.displayName = 'Services';

export default Services;
