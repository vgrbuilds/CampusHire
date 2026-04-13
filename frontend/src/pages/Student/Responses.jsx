import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { applicationsAPI } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { BadgeCheck, Clock3, XCircle, MapPin, Building2 } from 'lucide-react';

export default function Responses() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await applicationsAPI.getByStudent(user?.id);
        setApplications(res.data);
      } catch {
        toast.error('Failed to load response timeline');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      load();
    }
  }, [user?.id]);

  const visibleApplications = filter === 'all'
    ? applications
    : applications.filter((application) => application.status === filter);

  const statusMeta = {
    accepted: { icon: <BadgeCheck size={16} />, label: 'Accepted', className: 'bg-green-500/20 text-green-300' },
    rejected: { icon: <XCircle size={16} />, label: 'Rejected', className: 'bg-red-500/20 text-red-300' },
    pending: { icon: <Clock3 size={16} />, label: 'Pending', className: 'bg-amber-500/20 text-amber-300' },
  };

  return (
    <div className="min-h-screen bg-dark-900 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-primary-400 mb-3">Response center</p>
          <h1 className="text-4xl font-bold mb-2">Application responses</h1>
          <p className="text-dark-400">Track every accepted, rejected, or pending decision in one place.</p>
        </motion.div>

        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {['all', 'pending', 'accepted', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-5 py-2 rounded-lg whitespace-nowrap transition ${
                filter === status ? 'bg-primary-500 text-white' : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="card-premium h-24 bg-dark-700 animate-pulse" />
            ))}
          </div>
        ) : visibleApplications.length > 0 ? (
          <div className="space-y-4">
            {visibleApplications.map((application, index) => {
              const meta = statusMeta[application.status] || statusMeta.pending;

              return (
                <motion.div
                  key={application.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card-premium"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{application.job_title}</h3>
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${meta.className}`}>
                          {meta.icon}
                          {meta.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-dark-400">
                        <span className="flex items-center gap-2"><Building2 size={16} /> {application.recruiter_company || application.recruiter_name}</span>
                        {application.job_campus_name && (
                          <span className="flex items-center gap-2"><MapPin size={16} /> {application.job_campus_name}</span>
                        )}
                        <span>Applied: {new Date(application.created_at || application.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-sm text-dark-400">
                      {application.resume_title ? `Resume: ${application.resume_title}` : 'Resume not attached'}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="card-premium text-center py-12">
            <p className="text-dark-400">No responses match the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}