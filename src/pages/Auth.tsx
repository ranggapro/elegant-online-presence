
import React from 'react';
import AuthForm from '@/components/AuthForm';
import { Shield } from 'lucide-react';

const Auth = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-accent/5 to-blue-400/10">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-12 items-center">
        <div className="hidden md:flex flex-col items-center justify-center">
          <div className="mb-8 p-4 rounded-full bg-accent/10">
            <Shield size={64} className="text-accent" />
          </div>
          <h1 className="text-4xl font-display font-bold mb-4 text-center">
            <span className="text-gradient">CyberGuard</span> Academy
          </h1>
          <p className="text-center text-muted-foreground">
            Your journey to becoming a cybersecurity expert starts here. 
            Learn essential skills, latest techniques, and best practices.
          </p>
        </div>
        
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
