import { Award, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

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
    name: "Introduction to Artificial Intelligence",
    issuer: "Unihance",
    date: "June 2022",
    category: "AI"
  },
  {
    name: "Python For Data Science (Part 1)",
    issuer: "Unihance",
    date: "June 2022",
    category: "Python"
  },
  {
    name: "Python For Data Science (Part 2)",
    issuer: "Unihance",
    date: "July 2022",
    category: "Python"
  }
];

const Certificates = () => {
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
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CERTIFICATES.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
