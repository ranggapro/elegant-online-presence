
import React, { useEffect, useState } from 'react';
import { Shield, Database, Globe, Code, AlertTriangle, Network } from 'lucide-react';
import AnimatedText from '@/components/AnimatedText';
import ScrollReveal from '@/components/ScrollReveal';
import { supabase } from '@/integrations/supabase/client';

interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: JSX.Element;
  modules: number;
  students: number;
}

const Dashboard = () => {
  const [displayName, setDisplayName] = useState<string>('');

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: profile } = await supabase
        .from('profiles').select('full_name').eq('id', user.id).maybeSingle();
      setDisplayName(profile?.full_name || user.email || '');
    })();
  }, []);

  const courses: Course[] = [
    {
      id: '1',
      title: 'Cybersecurity Fundamentals',
      description: 'Learn the core concepts and principles of cybersecurity',
      level: 'Beginner',
      icon: <Shield className="h-8 w-8 text-accent" />,
      modules: 8,
      students: 1245
    },
    {
      id: '2',
      title: 'Network Security',
      description: 'Protect computer networks from intrusion and attacks',
      level: 'Intermediate',
      icon: <Network className="h-8 w-8 text-accent" />,
      modules: 12,
      students: 876
    },
    {
      id: '3',
      title: 'Ethical Hacking',
      description: 'Master the techniques used by hackers to identify vulnerabilities',
      level: 'Advanced',
      icon: <Code className="h-8 w-8 text-accent" />,
      modules: 15,
      students: 932
    },
    {
      id: '4',
      title: 'Web Application Security',
      description: 'Learn to secure web applications from common attacks',
      level: 'Intermediate',
      icon: <Globe className="h-8 w-8 text-accent" />,
      modules: 10,
      students: 678
    },
    {
      id: '5',
      title: 'Database Security',
      description: 'Protect sensitive data and secure database systems',
      level: 'Intermediate',
      icon: <Database className="h-8 w-8 text-accent" />,
      modules: 9,
      students: 543
    },
    {
      id: '6',
      title: 'Threat Intelligence',
      description: 'Identify and respond to security threats effectively',
      level: 'Advanced',
      icon: <AlertTriangle className="h-8 w-8 text-accent" />,
      modules: 14,
      students: 421
    },
  ];

  const stats = [
    { label: 'Courses', value: courses.length },
    { label: 'Students', value: '5,000+' },
    { label: 'Certifications', value: '12' },
    { label: 'Instructors', value: '24' }
  ];

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Welcome Hero */}
        <div className="mb-10">
          <ScrollReveal>
            <AnimatedText
              text={displayName ? `Halo, ${displayName.split(' ')[0]} 👋` : 'Selamat Datang di CyberGuard Academy'}
              className="text-3xl md:text-4xl font-display font-bold mb-4"
            />
            <p className="text-muted-foreground max-w-2xl">
              Platform belajar cybersecurity lengkap — mulai dari fundamental hingga ethical hacking tingkat lanjut.
            </p>
          </ScrollReveal>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <ScrollReveal 
              key={stat.label} 
              className="bg-white dark:bg-black p-6 rounded-xl shadow-sm border border-border text-center"
              delay={index * 100}
            >
              <p className="text-3xl font-bold text-accent mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </ScrollReveal>
          ))}
        </div>

        {/* Featured Courses */}
        <div className="mb-16">
          <ScrollReveal>
            <h2 className="text-2xl font-bold mb-6">Cybersecurity Courses</h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <ScrollReveal 
                key={course.id}
                delay={index * 100}
                className="bg-white dark:bg-black rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      {course.icon}
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded ${
                      course.level === 'Beginner' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                        : course.level === 'Intermediate'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                          : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-muted-foreground mb-4">{course.description}</p>
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{course.modules} modules</span>
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                </div>
                <div className="px-6 py-4 bg-muted/20 border-t border-border">
                  <button className="w-full py-2 bg-accent/10 hover:bg-accent/20 text-accent font-medium rounded-lg transition-colors">
                    Start Learning
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <ScrollReveal>
          <div className="bg-gradient-to-r from-accent/20 to-blue-500/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to advance your cybersecurity career?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of students who are learning cybersecurity skills and building successful careers.
            </p>
            <button className="px-8 py-3 bg-accent hover:bg-accent/90 text-white font-medium rounded-lg transition-colors">
              Explore All Courses
            </button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Dashboard;
