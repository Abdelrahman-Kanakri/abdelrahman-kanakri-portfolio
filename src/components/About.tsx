import { memo } from 'react';
import { GraduationCap, Briefcase, Code, Wrench, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = memo(() => {
  const experiences = [
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
  ];

  const skills = {
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
  };

  return (
    <section id="about" className="py-20 px-6 bg-card/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building the future with data-driven insights and innovative AI solutions
          </p>
        </div>

        {/* Education */}
        <Card className="card-hover mb-12 border-accent/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <GraduationCap className="h-8 w-8 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-2">Education</h3>
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-foreground">Bachelor's Degree in Data Science & Artificial Intelligence</p>
                  <p className="text-accent font-medium">Irbid National University</p>
                  <p className="text-muted-foreground">Graduated: 2024</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Work Experience */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="h-8 w-8 text-accent" />
            <h3 className="text-3xl font-bold text-foreground">Work Experience</h3>
          </div>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Card key={index} className="card-hover border-accent/20 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-xl font-bold text-accent">{exp.title}</h4>
                      <p className="text-lg font-medium text-foreground">{exp.company}</p>
                      <p className="text-sm text-muted-foreground">{exp.date}</p>
                    </div>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-foreground/80">
                          <span className="text-accent mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-8">
            <Code className="h-8 w-8 text-accent" />
            <h3 className="text-3xl font-bold text-foreground">Skills & Expertise</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Technical Skills */}
            <Card className="card-hover border-accent/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="h-6 w-6 text-accent" />
                  <h4 className="text-xl font-bold text-foreground">Technical Skills</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.technical.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tools */}
            <Card className="card-hover border-accent/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Wrench className="h-6 w-6 text-accent" />
                  <h4 className="text-xl font-bold text-foreground">Tools</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((tool, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded-full text-sm font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Soft Skills */}
            <Card className="card-hover border-accent/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-6 w-6 text-accent" />
                  <h4 className="text-xl font-bold text-foreground">Soft Skills</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.soft.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;
