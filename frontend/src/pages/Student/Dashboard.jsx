import { useState, useEffect } from 'react';
import { jobsAPI, applicationsAPI } from '../../services/api';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { Briefcase, TrendingUp, Users, CheckCircle, UserCircle2, BookOpen, Files, BadgeCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import JobCard from '../../components/Jobs/JobCard';
import { Link } from 'react-router-dom';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [stats, setStats] = useState({
    totalApplications: 0,
    totalJobs: 0,
    acceptedApplications: 0,
    pendingApplications: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchData();
    }
  }, [user?.id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [jobsRes, applicationsRes] = await Promise.all([
        jobsAPI.getAll(),
        applicationsAPI.getByStudent(user.id),
      ]);

      setJobs(jobsRes.data.slice(0, 3));
      setApplications(applicationsRes.data);
      setRecentApplications(applicationsRes.data.slice(0, 3));

      setStats({
        totalApplications: applicationsRes.data.length,
        totalJobs: jobsRes.data.length,
        acceptedApplications: applicationsRes.data.filter(a => a.status === 'accepted').length,
        pendingApplications: applicationsRes.data.filter(a => a.status === 'pending').length,
      });
    } catch (error) {
      toast.error('Failed to load dashboard data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      icon: <Briefcase size={24} />,
      label: 'Total Applications',
      value: stats.totalApplications,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <TrendingUp size={24} />,
      label: 'Active Jobs',
      value: stats.totalJobs,
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <CheckCircle size={24} />,
      label: 'Offers',
      value: stats.acceptedApplications,
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <Users size={24} />,
      label: 'Pending',
      value: stats.pendingApplications,
      color: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-900 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}!</h1>
              <p className="text-dark-400">Track your applications and discover new opportunities for {user?.campus || 'your campus'}.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/profile" className="btn-secondary flex items-center gap-2">
                <UserCircle2 size={18} />
                Profile
              </Link>
              <Link to="/jobs" className="btn-primary flex items-center gap-2">
                <BookOpen size={18} />
                Campus Jobs
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`card-premium bg-gradient-to-br ${stat.color} p-0 overflow-hidden`}
            >
              <div className="bg-dark-800 backdrop-blur-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-dark-400 text-sm font-medium">{stat.label}</p>
                    <p className="text-4xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className="text-4xl opacity-20">{stat.icon}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="card-premium">
            <p className="text-dark-400 text-sm mb-2">Profile</p>
            <h3 className="text-xl font-semibold mb-4">{user?.name}</h3>
            <div className="space-y-2 text-sm text-dark-300">
              <p>Email: {user?.email}</p>
              <p>Campus: {user?.campus || 'Not set'}</p>
              <p>Role: {user?.role}</p>
            </div>
            <Link to="/profile" className="inline-flex mt-5 text-primary-400 hover:text-primary-300 font-medium">
              View profile
            </Link>
          </div>

          <div className="card-premium lg:col-span-2">
            <p className="text-dark-400 text-sm mb-2">Recent application decisions</p>
            {recentApplications.length > 0 ? (
              <div className="space-y-3">
                {recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between rounded-xl border border-dark-700 bg-dark-800/60 px-4 py-3">
                    <div>
                      <p className="font-semibold">{app.job_title}</p>
                      <p className="text-xs text-dark-400">{app.recruiter_company || app.recruiter_name}</p>
                    </div>
                    <span className="badge-primary capitalize">{app.status}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-dark-400">No applications yet.</p>
            )}
          </div>
        </div>

        {/* Latest Jobs */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <div className="mb-8">
            <div className="flex items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold">Latest Opportunities</h2>
              <Link to="/applications" className="text-primary-400 hover:text-primary-300 text-sm font-medium">
                View applied jobs
              </Link>
            </div>
            {loading ? (
              <div className="grid grid-cols-1 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="card-premium h-40 bg-dark-700 animate-pulse" />
                ))}
              </div>
            ) : jobs.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {jobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Briefcase size={48} className="mx-auto text-dark-600 mb-4" />
                <p className="text-dark-400">No jobs available yet</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
