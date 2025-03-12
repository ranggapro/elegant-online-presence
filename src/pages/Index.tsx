
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';
import ProjectCard from '@/components/ProjectCard';
import AnimatedText from '@/components/AnimatedText';
import { Code, Figma, Monitor, ArrowRight } from 'lucide-react';

const projects = [
  {
    id: '1',
    title: 'Modern E-commerce Platform',
    description: 'A full-featured online store with cart, payment integration, and responsive design',
    imageSrc: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    tags: ['React', 'Tailwind', 'Stripe'],
    link: '/projects',
  },
  {
    id: '2',
    title: 'Portfolio Website Template',
    description: 'Minimalist designer portfolio with animations and smooth scrolling effects',
    imageSrc: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    tags: ['HTML/CSS', 'JavaScript', 'GSAP'],
    link: '/projects',
  },
  {
    id: '3',
    title: 'Task Management App',
    description: 'Collaborative project management tool with kanban boards and team features',
    imageSrc: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    tags: ['React', 'Node.js', 'MongoDB'],
    link: '/projects',
  },
];

const services = [
  {
    icon: <Monitor size={36} className="text-accent" />,
    title: 'UI/UX Design',
    description: 'Creating beautiful, intuitive interfaces that enhance user experience and engagement.',
  },
  {
    icon: <Code size={36} className="text-accent" />,
    title: 'Web Development',
    description: 'Building responsive, high-performance websites and applications with modern technologies.',
  },
  {
    icon: <Figma size={36} className="text-accent" />,
    title: 'Product Design',
    description: 'Designing comprehensive digital products from concept to final implementation.',
  },
];

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      {/* Services Section */}
      <section className="py-24 px-6 bg-secondary/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">My Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                I offer a range of services to help businesses and individuals create amazing digital experiences
              </p>
            </ScrollReveal>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScrollReveal 
                key={service.title} 
                className="bg-white dark:bg-black p-8 rounded-2xl shadow-sm border border-border"
                delay={index * 100}
              >
                <div className="mb-4 p-3 bg-accent/10 w-fit rounded-xl">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16">
            <div>
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Featured Projects</h2>
                <p className="text-muted-foreground max-w-xl">
                  Explore some of my recent work. Each project represents my passion for design and development.
                </p>
              </ScrollReveal>
            </div>
            
            <ScrollReveal delay={200}>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 mt-6 md:mt-0 px-6 py-3 rounded-full bg-white shadow-sm border border-border font-medium transition-all hover:shadow hover:translate-y-[-2px]"
              >
                View All
                <ArrowRight size={16} />
              </Link>
            </ScrollReveal>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 100}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-accent/10 to-blue-400/10">
        <div className="container mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Ready to start your project?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Let's create something amazing together. Get in touch to discuss your ideas and how we can bring them to life.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
            >
              Contact Me
              <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Index;
