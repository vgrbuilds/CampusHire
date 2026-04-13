import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ isAuthenticated, userRole, requiredRole, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
