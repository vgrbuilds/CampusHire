import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { jobsAPI, applicationsAPI } from '../../services/api';
import { BadgeCheck, Briefcase, MapPin, Mail, UserCircle2 } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ availableJobs: 0, applications: 0, accepted: 0 });

  useEffect(() => {
    const load = async () => {
      try {
        const [jobsRes, applicationsRes] = await Promise.all([
          jobsAPI.getAll(),
          applicationsAPI.getByStudent(user?.id),
        ]);

        setStats({
          availableJobs: jobsRes.data.length,
          applications: applicationsRes.data.length,
          accepted: applicationsRes.data.filter((application) => application.status === 'accepted').length,
        });
      } catch {
        setStats({ availableJobs: 0, applications: 0, accepted: 0 });
      }
    };

    if (user?.id) {
      load();
    }
  }, [user?.id]);

  return (
    <div className="min-h-screen bg-dark-900 pt-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-primary-400 mb-3">Student profile</p>
          <h1 className="text-4xl font-bold mb-2">{user?.name}</h1>
          <p className="text-dark-400">Your campus drives the job feed and recommendation scope.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="card-premium lg:col-span-2">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center">
                <UserCircle2 size={30} className="text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2">Account Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-dark-300">
                  <p className="flex items-center gap-2"><Mail size={16} className="text-primary-400" /> {user?.email}</p>
                  <p className="flex items-center gap-2"><BadgeCheck size={16} className="text-primary-400" /> {user?.role}</p>
                  <p className="flex items-center gap-2"><MapPin size={16} className="text-primary-400" /> {user?.campus || 'Campus not set'}</p>
                  <p className="flex items-center gap-2"><Briefcase size={16} className="text-primary-400" /> CampusHire student account</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-premium">
            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-dark-400">Jobs available</span>
                <span className="font-semibold">{stats.availableJobs}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-dark-400">Applications</span>
                <span className="font-semibold">{stats.applications}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-dark-400">Accepted</span>
                <span className="font-semibold">{stats.accepted}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card-premium flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-1">Keep your campus up to date</h3>
            <p className="text-dark-400 text-sm">If your campus changes, update your account so the job feed stays accurate.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/jobs" className="btn-primary">Browse jobs</Link>
            <Link to="/applications" className="btn-secondary">My applications</Link>
          </div>
        </div>
      </div>
    </div>
  );
}