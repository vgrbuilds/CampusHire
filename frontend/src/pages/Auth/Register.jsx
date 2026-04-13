import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { Mail, Lock, User, Building2, Loader, MapPin, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    campus: '',
    company: '',
  });
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        campus: formData.role === 'student' ? formData.campus : '',
        ...(formData.role === 'recruiter' && { company: formData.company }),
      });

      const { token, user } = response.data;
      setAuth(user, token);
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="card-premium">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Create Account</h2>
            <p className="text-dark-400">Join CampusHire and start your journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-dark-400" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-dark-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">I am a</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'student' }))}
                  className={`py-2 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                    formData.role === 'student'
                      ? 'bg-primary-500 text-white'
                      : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
                  }`}
                >
                  <ShieldCheck size={16} />
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'recruiter' }))}
                  className={`py-2 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                    formData.role === 'recruiter'
                      ? 'bg-primary-500 text-white'
                      : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
                  }`}
                >
                  <ShieldCheck size={16} />
                  Recruiter
                </button>
              </div>
            </div>

            {formData.role === 'student' ? (
              <div>
                <label className="block text-sm font-medium mb-2">Campus</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 text-dark-400" size={20} />
                  <input
                    type="text"
                    name="campus"
                    value={formData.campus}
                    onChange={handleChange}
                    placeholder="e.g., Main Campus, North Campus"
                    required
                    className="input-field pl-10"
                  />
                </div>
                <p className="mt-2 text-xs text-dark-400">
                  This campus controls which jobs you can see.
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-dark-700 bg-dark-800/60 p-4 text-sm text-dark-300">
                Recruiters can target a campus when creating a job.
              </div>
            )}

            {/* Company (Recruiter Only) */}
            {formData.role === 'recruiter' && (
              <div>
                <label className="block text-sm font-medium mb-2">Company Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3.5 text-dark-400" size={20} />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company"
                    required
                    className="input-field pl-10"
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-dark-400" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  required
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-dark-400" size={20} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  required
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Checkbox */}
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" required className="w-4 h-4 rounded" />
              <span className="text-dark-400">I agree to Terms and Privacy Policy</span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading && <Loader size={20} className="animate-spin" />}
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-6 text-dark-400">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-400 hover:text-primary-300 font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
