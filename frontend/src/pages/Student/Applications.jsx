import { useState, useEffect } from 'react';
import { applicationsAPI } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { BarChart, FileText, Share2, Building2, MapPin } from 'lucide-react';

export default function Applications() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await applicationsAPI.getByStudent(user?.id);
      setApplications(res.data);
    } catch (error) {
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(app => app.status === filter);

  const statusConfig = {
    pending: { color: 'bg-amber-500/20', textColor: 'text-amber-300', label: 'Pending' },
    accepted: { color: 'bg-green-500/20', textColor: 'text-green-300', label: 'Accepted' },
    rejected: { color: 'bg-red-500/20', textColor: 'text-red-300', label: 'Rejected' },
  };

  return (
    <div className="min-h-screen bg-dark-900 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-2">My Applications</h1>
          <p className="text-dark-400 mb-8">Track all your job applications in one place</p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {['all', 'pending', 'accepted', 'rejected'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                filter === status
                  ? 'bg-primary-500 text-white'
                  : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Applications List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="card-premium h-24 bg-dark-700 animate-pulse" />
            ))}
          </div>
        ) : filteredApplications.length > 0 ? (
          <div className="space-y-4">
            {filteredApplications.map((app, idx) => {
              const statusConfig_item = statusConfig[app.status];
              return (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="card-premium flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{app.job_title}</h3>
                    <p className="text-dark-400 text-sm mb-3 flex items-center gap-2">
                      <Building2 size={16} />
                      {app.recruiter_company || app.recruiter_name}
                    </p>
                    <div className="flex gap-4 text-xs text-dark-400">
                      <span>Applied: {new Date(app.created_at || app.createdAt).toLocaleDateString()}</span>
                      <span>Score: {app.aiScore || 'N/A'}</span>
                      {app.job_campus_name && (
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {app.job_campus_name}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`px-4 py-2 rounded-lg ${statusConfig_item.color} ${statusConfig_item.textColor}`}>
                      {statusConfig_item.label}
                    </div>
                    <button className="p-2 hover:bg-dark-700 rounded-lg transition">
                      <Share2 size={18} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="card-premium text-center py-12">
            <FileText size={48} className="mx-auto text-dark-600 mb-4" />
            <p className="text-dark-400">No applications yet. Start applying to jobs!</p>
          </div>
        )}
      </div>
    </div>
  );
}
