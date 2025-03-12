
import React, { useEffect, useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  tag?: keyof JSX.IntrinsicElements;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  text, 
  className = '', 
  delay = 0, 
  tag = 'h1' 
}) => {
  const textRef = useRef<HTMLElement | null>(null);
  const Tag = tag as React.ElementType;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              if (entry.target instanceof HTMLElement) {
                entry.target.classList.add('animate-text-reveal');
                observer.unobserve(entry.target);
              }
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, [delay]);

  return (
    <Tag 
      ref={textRef as any} 
      className={`opacity-0 overflow-hidden ${className}`}
    >
      {text}
    </Tag>
  );
};

export default AnimatedText;
