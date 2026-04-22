import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

interface Props {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<Props> = ({ children, adminOnly = false }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Student trying to access admin page
  if (adminOnly && !user.is_admin) {
    return <Navigate to="/student/dashboard" replace />;
  }

  // Admin trying to access student page
  if (!adminOnly && user.is_admin) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;