
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);
  }, []);
  
  if (isAuthenticated === null) {
    // Still checking authentication status
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  // User is authenticated, render the protected route
  return <>{children}</>;
};

export default ProtectedRoute;
