
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedText from './AnimatedText';
import ScrollReveal from './ScrollReveal';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden">
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(66, 153, 225, 0.5) 0%, transparent 35%)",
        }}
      />
      
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <ScrollReveal>
              <span className="inline-block mb-3 px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                Welcome to my portfolio
              </span>
            </ScrollReveal>
            
            <div className="overflow-hidden mb-4">
              <AnimatedText
                text="Hi, I'm Your Name"
                tag="h1"
                delay={200}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-tight"
              />
            </div>
            
            <div className="overflow-hidden mb-6">
              <AnimatedText
                tag="h2"
                text="Web Designer & Developer"
                delay={400}
                className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gradient"
              />
            </div>
            
            <ScrollReveal delay={600} className="max-w-xl">
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I craft elegant, user-focused digital experiences with clean code and modern design. Let's create something amazing together.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
                >
                  View Projects 
                  <ArrowRight size={16} />
                </Link>
                
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary shadow-sm border border-border font-medium transition-all hover:bg-secondary hover:shadow hover:translate-y-[-2px]"
                >
                  Contact Me
                </Link>
              </div>
            </ScrollReveal>
          </div>
          
          <ScrollReveal
            className="order-1 lg:order-2 flex justify-center"
            animation="animate-scale-in" 
            delay={300}
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent to-blue-400" />
              <div className="absolute inset-1 rounded-full bg-white dark:bg-black overflow-hidden">
                {/* Replace with your profile image */}
                <div className="w-full h-full grid place-items-center text-5xl font-bold text-accent">YN</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;
