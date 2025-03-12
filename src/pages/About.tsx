
import { useEffect } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import AnimatedText from '@/components/AnimatedText';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Book, Briefcase, Calendar, GraduationCap } from 'lucide-react';

const skills = [
  "HTML/CSS", "JavaScript", "TypeScript", "React", "Vue.js", 
  "Node.js", "Express", "MongoDB", "Tailwind CSS", "Figma",
  "UI/UX Design", "Responsive Design", "Git", "RESTful APIs", "GraphQL"
];

const timeline = [
  {
    year: "2023 - Present",
    title: "Senior Frontend Developer",
    company: "Tech Innovation Inc.",
    description: "Leading the frontend team in developing modern web applications with React and TypeScript.",
    icon: <Briefcase className="text-accent" />
  },
  {
    year: "2020 - 2023",
    title: "Web Developer",
    company: "Digital Solutions Agency",
    description: "Built responsive websites and e-commerce platforms for various clients using modern web technologies.",
    icon: <Briefcase className="text-accent" />
  },
  {
    year: "2018 - 2020",
    title: "UI/UX Designer",
    company: "Creative Studio",
    description: "Designed user interfaces and experiences for web and mobile applications.",
    icon: <Briefcase className="text-accent" />
  },
  {
    year: "2014 - 2018",
    title: "Computer Science Degree",
    company: "University of Technology",
    description: "Bachelor's degree with focus on web development and user interface design.",
    icon: <GraduationCap className="text-accent" />
  }
];

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <span className="inline-block mb-3 px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                  About Me
                </span>
              </ScrollReveal>
              
              <div className="overflow-hidden mb-6">
                <AnimatedText
                  text="Get to know me."
                  tag="h1"
                  delay={200}
                  className="text-4xl md:text-5xl font-display font-bold tracking-tight"
                />
              </div>
              
              <ScrollReveal delay={400}>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  I'm a passionate web designer and developer with over 5 years of experience creating beautiful, functional websites and applications.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  My goal is to blend appealing aesthetics with intuitive user experiences, delivering digital solutions that not only look great but also solve real problems for users and businesses.
                </p>
                
                <div className="flex gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
                  >
                    Contact Me
                    <ArrowRight size={16} />
                  </Link>
                  
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary shadow-sm border border-border font-medium transition-all hover:bg-secondary hover:shadow hover:translate-y-[-2px]"
                    download
                  >
                    Download CV
                  </a>
                </div>
              </ScrollReveal>
            </div>
            
            <ScrollReveal className="order-first lg:order-last" animation="animate-scale-in" delay={300}>
              <div className="relative rounded-2xl overflow-hidden aspect-square">
                <div className="absolute -bottom-2 -right-2 w-full h-full bg-gradient-to-br from-accent to-blue-400 rounded-2xl" />
                <div className="absolute inset-[3px] bg-white dark:bg-black rounded-2xl overflow-hidden">
                  {/* Replace with your profile image */}
                  <div className="w-full h-full grid place-items-center text-6xl font-bold text-accent">YN</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Experience & Education Section */}
      <section className="py-24 px-6 bg-secondary/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Experience & Education</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                My professional journey and academic background
              </p>
            </ScrollReveal>
          </div>
          
          <div className="relative max-w-3xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-border" />
            
            {/* Timeline Items */}
            {timeline.map((item, index) => (
              <ScrollReveal 
                key={index}
                className="mb-12 relative"
                delay={index * 100}
              >
                <div className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
                }`}>
                  <div className={`md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:order-last'
                  }`}>
                    <div className="bg-white dark:bg-black p-6 rounded-xl shadow-sm border border-border">
                      <span className="inline-flex items-center text-sm font-medium text-accent mb-2 gap-1">
                        <Calendar size={14} />
                        {item.year}
                      </span>
                      <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                      <p className="text-sm text-primary/80 mb-3">{item.company}</p>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-10 h-10 rounded-full bg-white dark:bg-black border-4 border-accent/20 flex items-center justify-center z-10">
                    {item.icon}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Skills & Expertise</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The technologies and skills I use to bring products to life
              </p>
            </ScrollReveal>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, index) => (
              <ScrollReveal 
                key={skill} 
                className="px-4 py-2 bg-accent/10 text-accent rounded-lg font-medium"
                delay={index * 50}
              >
                {skill}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-accent/10 to-blue-400/10">
        <div className="container mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Let's work together</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              If you're looking for a developer with my skill set, I'd love to hear about your project. Let's create something amazing together.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
            >
              Get In Touch
              <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default About;
