
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { toast } from 'sonner';
import AnimatedText from './AnimatedText';
import ScrollReveal from './ScrollReveal';

type AuthMode = 'login' | 'register';

const AuthForm = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate authentication (replace with real auth when connected to Supabase)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (mode === 'register') {
        // Register logic would go here with Supabase
        toast.success('Account created successfully!');
        setMode('login');
      } else {
        // Login logic would go here with Supabase
        toast.success('Login successful!');
        localStorage.setItem('user', JSON.stringify({ email: formData.email }));
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(mode === 'login' ? 'Login failed' : 'Registration failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <ScrollReveal>
        <div className="bg-white dark:bg-black/90 rounded-2xl shadow-lg border border-border p-8">
          <AnimatedText 
            text={mode === 'login' ? "Welcome Back" : "Create Account"} 
            tag="h1"
            className="text-3xl font-bold text-center mb-2"
          />
          <p className="text-muted-foreground text-center mb-8">
            {mode === 'login' 
              ? "Sign in to continue your learning journey" 
              : "Join our cybersecurity learning platform"}
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-muted-foreground">
                    <User size={18} />
                  </span>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-background"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-muted-foreground">
                  <Mail size={18} />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-background"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-muted-foreground">
                  <Lock size={18} />
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-background"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            {mode === 'login' && (
              <div className="text-right">
                <button type="button" className="text-sm text-accent hover:underline">
                  Forgot Password?
                </button>
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-accent/90 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              {loading ? (
                <span className="animate-pulse">Processing...</span>
              ) : mode === 'login' ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={toggleMode}
                className="text-accent hover:underline font-medium"
              >
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default AuthForm;
