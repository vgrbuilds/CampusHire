import { useState, useEffect } from 'react';
import { jobsAPI, applicationsAPI } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { TrendingUp, Briefcase, Users, CheckCircle, Plus, MapPin, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    acceptedApplications: 0,
  });
  const [jobs, setJobs] = useState([]);
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
        applicationsAPI.getAll(),
      ]);

      const recruiterJobs = jobsRes.data;
      const recruiterJobIds = new Set(recruiterJobs.map((job) => String(job.id)));
      const recruiterApplications = applicationsRes.data.filter((application) => recruiterJobIds.has(String(application.job_id)));

      setJobs(recruiterJobs.slice(0, 3));
      setStats({
        totalJobs: recruiterJobs.length,
        totalApplications: recruiterApplications.length,
        acceptedApplications: recruiterApplications.filter((application) => application.status === 'accepted').length,
      });
    } catch (error) {
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      icon: <Briefcase size={24} />,
      label: 'Posted Jobs',
      value: stats.totalJobs,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <TrendingUp size={24} />,
      label: 'Openings',
      value: stats.totalJobs,
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <Users size={24} />,
      label: 'Total Applications',
      value: stats.totalApplications,
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: <CheckCircle size={24} />,
      label: 'Accepted',
      value: stats.acceptedApplications,
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-900 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-start mb-12"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2">Recruitment Hub</h1>
            <p className="text-dark-400">Welcome back, {user?.name}! Manage campus-targeted jobs and applications.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/recruiter/create-drive" className="btn-secondary flex items-center gap-2">
              <Plus size={20} />
              New Drive
            </Link>
            <Link to="/recruiter/create-job" className="btn-secondary flex items-center gap-2">
              <Plus size={20} />
              New Job
            </Link>
          </div>
        </motion.div>

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

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold">Recent Posted Jobs</h2>
            <Link to="/recruiter/create-job" className="text-primary-400 hover:text-primary-300 text-sm font-medium">
              Post another job
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card-premium h-20 bg-dark-700 animate-pulse" />
              ))}
            </div>
          ) : jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job, idx) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="card-premium"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-dark-400 mt-1">
                        <span className="flex items-center gap-2"><Building2 size={16} /> {job.recruiter_company || job.recruiter_name}</span>
                        {job.campus_name && (
                          <span className="flex items-center gap-2"><MapPin size={16} /> {job.campus_name}</span>
                        )}
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-primary-500/20 text-primary-300 rounded-lg hover:bg-primary-500/30 transition">
                      View Job
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="card-premium text-center py-12">
              <Briefcase size={48} className="mx-auto text-dark-600 mb-4" />
              <p className="text-dark-400">No posted jobs yet. Create one to get started!</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}