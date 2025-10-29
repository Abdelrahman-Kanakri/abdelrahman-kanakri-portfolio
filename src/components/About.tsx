import { memo } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Code, Wrench, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const EXPERIENCES = [
  {
    title: "AI Automation Trainee",
    company: "Robotna Education",
    date: "September 2025",
    achievements: [
      "Gained hands-on experience in AI automation technologies and workflows",
      "Developed automated solutions for streamlining business processes",
      "Collaborated with cross-functional teams on AI integration projects"
    ]
  },
  {
    title: "Data Scientist Trainee",
    company: "Correlation One Fellowship Program",
    date: "October 2024 - March 2025",
    achievements: [
      "Completed intensive training in advanced data science methodologies",
      "Built end-to-end machine learning pipelines for real-world datasets",
      "Analyzed IMDB Top 1000 dataset using feature engineering and data visualization"
    ]
  },
  {
    title: "Data Science & Machine Learning Internship",
    company: "SHAI",
    date: "February 2022 - May 2022",
    achievements: [
      "Developed predictive models using scikit-learn and TensorFlow",
      "Performed exploratory data analysis on complex datasets",
      "Created interactive dashboards for data-driven decision making"
    ]
  }
] as const;

const SKILLS = {
  technical: [
    "Python", "Java", "C++", "Pandas", "NumPy", "Data Structures", "Algorithms",
    "Deep Learning", "Machine Learning", "Data Analytics", "NLP", "Scikit-learn",
    "TensorFlow", "RAG"
  ],
  tools: [
    "Tableau", "Power BI", "Looker", "Git", "Google Colab", "Jupyter Notebook"
  ],
  soft: [
    "Leadership", "Teamwork", "Communication", "Time Management", "Problem Solving"
  ]
} as const;

const About = memo(() => {

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-card/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-10 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient">About Me</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Building the future with data-driven insights and innovative AI solutions
          </p>
        </motion.div>

        {/* Education */}
        <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.01, y: -2 }}
          whileTap={{ scale: 0.99 }}
          className="w-full"
        >
          <Card className="mb-8 sm:mb-10 lg:mb-12 border-accent/20 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10 w-full">
            <CardContent className="p-5 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-accent/10 rounded-lg">
                <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Education</h3>
                <div className="space-y-1.5 sm:space-y-2">
                  <p className="text-lg sm:text-xl font-semibold text-foreground">Bachelor's Degree in Data Science & Artificial Intelligence</p>
                  <p className="text-accent font-medium text-sm sm:text-base">Irbid National University</p>
                  <p className="text-muted-foreground text-sm sm:text-base">Graduated: 2024</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </motion.div>

        {/* Work Experience */}
        <motion.div 
          className="mb-10 sm:mb-12 lg:mb-16 px-4"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
            <Briefcase className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Work Experience</h3>
          </div>
          <div className="space-y-4 sm:space-y-6 w-full">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.01, x: 4 }}
                whileTap={{ scale: 0.99 }}
                className="w-full"
              >
                <Card className="border-accent/20 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10 w-full">
                  <CardContent className="p-4 sm:p-5 lg:p-6">
                  <div className="space-y-2.5 sm:space-y-3">
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-accent">{exp.title}</h4>
                      <p className="text-base sm:text-lg font-medium text-foreground">{exp.company}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{exp.date}</p>
                    </div>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-foreground/80 text-sm sm:text-base">
                          <span className="text-accent mt-0.5 sm:mt-1">•</span>
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
        </div>

        {/* Skills */}
        <motion.div 
          className="space-y-6 sm:space-y-8 max-w-5xl mx-auto px-4"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
            <Code className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Skills & Expertise</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
            {/* Technical Skills */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="border-accent/20 bg-card/50 backdrop-blur-sm h-full transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10">

                <CardContent className="p-4 sm:p-5 lg:p-6">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Code className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                  <h4 className="text-lg sm:text-xl font-bold text-foreground">Technical Skills</h4>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {SKILLS.technical.map((skill, index) => (
                    <motion.span
                      key={index}
                      className="px-2.5 sm:px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded-full text-xs sm:text-sm font-medium"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.02 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </CardContent>
            </Card>
            </motion.div>

            {/* Tools */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="border-accent/20 bg-card/50 backdrop-blur-sm h-full transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10">

                <CardContent className="p-4 sm:p-5 lg:p-6">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Wrench className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                  <h4 className="text-lg sm:text-xl font-bold text-foreground">Tools</h4>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {SKILLS.tools.map((tool, index) => (
                    <motion.span
                      key={index}
                      className="px-2.5 sm:px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded-full text-xs sm:text-sm font-medium"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.02 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </CardContent>
            </Card>
            </motion.div>

            {/* Soft Skills */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="border-accent/20 bg-card/50 backdrop-blur-sm h-full transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10">
                <CardContent className="p-4 sm:p-5 lg:p-6">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                  <h4 className="text-lg sm:text-xl font-bold text-foreground">Soft Skills</h4>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {SKILLS.soft.map((skill, index) => (
                    <motion.span
                      key={index}
                      className="px-2.5 sm:px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded-full text-xs sm:text-sm font-medium"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.02 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </CardContent>
            </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;
