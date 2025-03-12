
import { useEffect, useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import AnimatedText from '@/components/AnimatedText';
import ProjectCard from '@/components/ProjectCard';

const projectsData = [
  {
    id: '1',
    title: 'Modern E-commerce Platform',
    description: 'A full-featured online store with cart, payment integration, and responsive design',
    imageSrc: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    tags: ['React', 'Tailwind', 'Stripe'],
    link: '#',
  },
  {
    id: '2',
    title: 'Portfolio Website Template',
    description: 'Minimalist designer portfolio with animations and smooth scrolling effects',
    imageSrc: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    tags: ['HTML/CSS', 'JavaScript', 'GSAP'],
    link: '#',
  },
  {
    id: '3',
    title: 'Task Management App',
    description: 'Collaborative project management tool with kanban boards and team features',
    imageSrc: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    tags: ['React', 'Node.js', 'MongoDB'],
    link: '#',
  },
  {
    id: '4',
    title: 'Healthcare Dashboard',
    description: 'Administrative interface for healthcare providers with patient management features',
    imageSrc: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    tags: ['Vue.js', 'D3.js', 'Firebase'],
    link: '#',
  },
  {
    id: '5',
    title: 'Mobile Banking App',
    description: 'Secure and user-friendly mobile application for personal banking needs',
    imageSrc: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    tags: ['React Native', 'GraphQL', 'Auth0'],
    link: '#',
  },
  {
    id: '6',
    title: 'Recipe Finder Application',
    description: 'Discover and save your favorite recipes from around the world',
    imageSrc: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    tags: ['JavaScript', 'API Integration', 'LocalStorage'],
    link: '#',
  },
];

const categories = ['All', 'Web Development', 'UI/UX Design', 'Mobile App'];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // In a real app, this would filter by category
  const filteredProjects = projectsData;

  return (
    <div className="flex flex-col min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <span className="inline-block mb-3 px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
              My Work
            </span>
          </ScrollReveal>
          
          <div className="overflow-hidden mb-4">
            <AnimatedText
              text="Projects & Case Studies"
              tag="h1"
              delay={200}
              className="text-4xl md:text-5xl font-display font-bold tracking-tight"
            />
          </div>
          
          <ScrollReveal delay={400} className="max-w-3xl">
            <p className="text-muted-foreground leading-relaxed">
              Browse through my latest projects. Each one represents unique challenges and solutions. 
              I'm always looking for new and interesting projects to work on.
            </p>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Projects Section */}
      <section className="pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Categories */}
          <ScrollReveal className="mb-12">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </ScrollReveal>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 100}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
