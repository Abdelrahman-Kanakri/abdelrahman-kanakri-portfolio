import { Mail, Phone, Linkedin, Github, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState, useCallback, memo } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { motion } from "framer-motion";

// Input validation schema
const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  email: z.string().trim().email({ message: "Invalid email address" }),
  message: z.string().trim().min(1, { message: "Message is required" })
});

const CONTACT_INFO = [
  { icon: Mail, label: "Email", value: "abdelrahamankanakrik@gmail.com", link: "mailto:abdelrahamankanakrik@gmail.com" },
  { icon: Phone, label: "Phone", value: "+962 7 7521 8484", link: "tel:+962775218484" },
  { icon: Linkedin, label: "LinkedIn", value: "Connect on LinkedIn", link: "https://www.linkedin.com/in/abdelrahman-kanakri-909654247/" },
  { icon: Github, label: "GitHub", value: "View My Code", link: "https://github.com/Abdelrahman-Kanakri/" }
] as const;

const Contact = memo(() => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const validatedData = contactSchema.parse(formData);
      const response = await fetch("https://formspree.io/f/mzzjleqe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      });
      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => toast.error(err.message));
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 px-6 sm:px-8">
      <div className="container mx-auto max-w-6xl">
        <motion.div className="text-center mb-10 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient">Get In Touch</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">Let's collaborate on your next data science or AI project</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 justify-items-center lg:justify-items-stretch">
          <motion.div className="lg:col-span-2 space-y-4 sm:space-y-6 w-full max-w-md lg:max-w-none" initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            {CONTACT_INFO.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.a key={index} href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined} rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined} whileTap={{ scale: 0.98 }}>
                  <Card className="border-accent/20 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10">
                    <CardContent className="p-4 sm:p-5 lg:p-6">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="p-2.5 sm:p-3 bg-accent/10 rounded-lg"><Icon className="h-5 w-5 sm:h-6 sm:w-6 text-accent" /></div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm text-muted-foreground">{item.label}</p>
                          <p className="text-sm sm:text-base font-medium text-foreground truncate">{item.value}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.a>
              );
            })}
          </motion.div>

          <motion.div className="lg:col-span-3 w-full max-w-md lg:max-w-none" initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Card className="border-accent/20 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10">
              <CardContent className="p-5 sm:p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="bg-background/50 border-accent/20 focus:border-accent" />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" required className="bg-background/50 border-accent/20 focus:border-accent" />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell me about your project..." rows={6} required className="bg-background/50 border-accent/20 focus:border-accent resize-none" />
                  </div>
                  <motion.div whileTap={{ scale: 0.98 }}>
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-accent hover:bg-accent/90 text-background font-semibold text-sm sm:text-base py-5 sm:py-6">
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <Send className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';
export default Contact;
