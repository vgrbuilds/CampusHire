import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { Toaster } from 'react-hot-toast';

// Pages
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import StudentDashboard from './pages/Student/Dashboard';
import StudentProfile from './pages/Student/Profile';
import StudentResponses from './pages/Student/Responses';
import RecruiterDashboard from './pages/Recruiter/Dashboard';
import JobsListing from './pages/Jobs/JobsListing';
import JobDetail from './pages/Jobs/JobDetail';
import Applications from './pages/Student/Applications';
import ResumesManager from './pages/Student/ResumesManager';
import RecruiterApplications from './pages/Recruiter/Applications';
import CreateDrive from './pages/Recruiter/CreateDrive';
import CreateJob from './pages/Recruiter/CreateJob';

// Components
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Toaster position="top-right" />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
            <Route
              path="/jobs"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} userRole={user?.role}>
                  <JobsListing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobs/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} userRole={user?.role}>
                  <JobDetail />
                </ProtectedRoute>
              }
            />

            {/* Protected Routes - Student */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} userRole={user?.role}>
                  {user?.role === 'student' ? <StudentDashboard /> : <RecruiterDashboard />}
                </ProtectedRoute>
              }
            />
            <Route
              path="/applications"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} userRole={user?.role} requiredRole="student">
                  <Applications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} userRole={user?.role} requiredRole="student">
                  <StudentProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/responses"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} userRole={user?.role} requiredRole="student">
                  <StudentResponses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resumes"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} userRole={user?.role} requiredRole="student">
                  <ResumesManager />
                </ProtectedRoute>
              }
            />

            {/* Protected Routes - Recruiter */}
            <Route
              path="/recruiter/applications"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} userRole={user?.role} requiredRole="recruiter">
                  <RecruiterApplications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recruiter/create-drive"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} userRole={user?.role} requiredRole="recruiter">
                  <CreateDrive />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recruiter/create-job"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} userRole={user?.role} requiredRole="recruiter">
                  <CreateJob />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
