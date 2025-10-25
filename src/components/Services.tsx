import { memo } from 'react';
import { Brain, Database, LineChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Services = memo(() => {
  const services = [
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
  ];

  return (
    <section id="services" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">
            AI & Data Science Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empowering businesses with intelligent solutions and data-driven strategies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index} 
                className="card-hover border-accent/20 bg-card/50 backdrop-blur-sm group hover:bg-card/80"
              >
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="mb-6">
                    <div className="inline-block p-4 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors">
                      <Icon className="h-10 w-10 text-accent" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-foreground/80 mb-6 flex-grow">
                    {service.description}
                  </p>

                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-accent mt-1 text-lg">•</span>
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
});

Services.displayName = 'Services';

export default Services;
