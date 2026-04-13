import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Menu, X, LogOut, User, BarChart3, BookOpen, Files, UserCircle2, Briefcase, BadgeCheck } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const studentLinks = [
    { to: '/profile', label: 'Profile', icon: <UserCircle2 size={18} /> },
    { to: '/jobs', label: 'Campus Jobs', icon: <BookOpen size={18} /> },
    { to: '/applications', label: 'Applied Jobs', icon: <Files size={18} /> },
    { to: '/responses', label: 'Responses', icon: <BadgeCheck size={18} /> },
  ];

  const recruiterLinks = [
    { to: '/recruiter/create-job', label: 'New Job', icon: <Briefcase size={18} /> },
    { to: '/recruiter/applications', label: 'Applications', icon: <Files size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">CH</span>
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent group-hover:opacity-80 transition">
              CampusHire
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {!isAuthenticated ? (
              <>
                <Link to="/jobs" className="text-dark-300 hover:text-white transition">
                  Jobs
                </Link>
                <Link to="/login" className="btn-primary">
                  Sign In
                </Link>
                <Link to="/register" className="btn-outline">
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-6">
                  <Link to="/jobs" className="text-dark-300 hover:text-white transition">
                    Jobs
                  </Link>
                  {(user?.role === 'student' ? studentLinks : recruiterLinks).map((link) => (
                    <Link key={link.to} to={link.to} className="text-dark-300 hover:text-white transition">
                      {link.label}
                    </Link>
                  ))}
                  <Link to="/dashboard" className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition">
                    <BarChart3 size={18} />
                    Dashboard
                  </Link>
                </div>

                {/* User Menu */}
                <div className="flex items-center gap-3 pl-6 border-l border-dark-700">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                    <User size={18} className="text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">{user?.name}</span>
                    <span className="text-xs text-dark-400 capitalize">{user?.role}{user?.campus ? ` · ${user.campus}` : ''}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="ml-2 p-2 hover:bg-dark-700 rounded-lg transition"
                    title="Logout"
                  >
                    <LogOut size={18} className="text-red-400" />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-dark-700 rounded-lg transition"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-dark-700 space-y-3">
            {!isAuthenticated ? (
              <>
                <Link to="/jobs" className="block text-dark-300 hover:text-white py-2">
                  Jobs
                </Link>
                <Link to="/login" className="block btn-primary text-center">
                  Sign In
                </Link>
                <Link to="/register" className="block btn-outline text-center">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/jobs" className="block text-dark-300 hover:text-white py-2">
                  Jobs
                </Link>
                {(user?.role === 'student' ? studentLinks : recruiterLinks).map((link) => (
                  <Link key={link.to} to={link.to} className="block text-dark-300 hover:text-white py-2">
                    {link.label}
                  </Link>
                ))}
                <Link to="/dashboard" className="block text-primary-400 py-2">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-400 py-2"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
