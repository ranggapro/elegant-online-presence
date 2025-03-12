
import { useEffect, useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import AnimatedText from '@/components/AnimatedText';
import { Github, Mail, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="flex flex-col min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <span className="inline-block mb-3 px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
              Get In Touch
            </span>
          </ScrollReveal>
          
          <div className="overflow-hidden mb-4">
            <AnimatedText
              text="Let's Start a Conversation"
              tag="h1"
              delay={200}
              className="text-4xl md:text-5xl font-display font-bold tracking-tight"
            />
          </div>
          
          <ScrollReveal delay={400} className="max-w-3xl">
            <p className="text-muted-foreground leading-relaxed">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </p>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div>
              <ScrollReveal className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary rounded-lg">
                    <Mail size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Email</h3>
                    <p className="text-muted-foreground">hello@yourname.com</p>
                    <a href="mailto:hello@yourname.com" className="text-accent text-sm hover:underline">
                      Send an email
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary rounded-lg">
                    <Phone size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Phone</h3>
                    <p className="text-muted-foreground">+1 (123) 456-7890</p>
                    <a href="tel:+11234567890" className="text-accent text-sm hover:underline">
                      Give me a call
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary rounded-lg">
                    <MapPin size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Location</h3>
                    <p className="text-muted-foreground">San Francisco, CA</p>
                    <p className="text-accent text-sm">Working worldwide</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary rounded-lg">
                    <Github size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Social</h3>
                    <p className="text-muted-foreground">Connect with me online</p>
                    <div className="flex gap-2 mt-2">
                      <a href="#" className="text-foreground hover:text-accent transition-colors">GitHub</a>
                      <span className="text-muted-foreground">•</span>
                      <a href="#" className="text-foreground hover:text-accent transition-colors">LinkedIn</a>
                      <span className="text-muted-foreground">•</span>
                      <a href="#" className="text-foreground hover:text-accent transition-colors">Twitter</a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
            
            {/* Contact Form */}
            <ScrollReveal 
              className="lg:col-span-2 rounded-2xl glass-panel border border-border bg-white dark:bg-black/30 p-8"
              delay={300}
            >
              <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Project Inquiry"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
