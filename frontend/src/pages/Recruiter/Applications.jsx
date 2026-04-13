import { useState, useEffect } from 'react';
import { jobsAPI, applicationsAPI } from '../../services/api';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { BarChart2, CheckCircle, Clock, XCircle, Building2, MapPin } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function RecruiterApplications() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    if (user?.id) {
      fetchApplications();
    }
  }, [user?.id]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const [jobsRes, applicationsRes] = await Promise.all([
        jobsAPI.getAll(),
        applicationsAPI.getAll(),
      ]);

      const recruiterJobIds = new Set(jobsRes.data.map((job) => String(job.id)));
      const recruiterApplications = applicationsRes.data.filter((application) => recruiterJobIds.has(String(application.job_id)));

      setApplications(recruiterApplications);
      setSelectedApp(recruiterApplications[0] || null);
    } catch (error) {
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (appId, newStatus) => {
    try {
      await applicationsAPI.updateStatus(appId, newStatus);
      setApplications(applications.map((app) =>
        app.id === appId ? { ...app, status: newStatus } : app
      ));
      setSelectedApp((prev) => (prev?.id === appId ? { ...prev, status: newStatus } : prev));
      toast.success(`Application ${newStatus}!`);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const [analyzingIds, setAnalyzingIds] = useState(new Set());

  const handleAiEvaluate = async (appId) => {
    try {
      setAnalyzingIds(prev => new Set(prev).add(appId));
      const response = await aiAPI.evaluateCandidate(appId);
      const updatedApp = response.data;
      
      setApplications(prev => prev.map(app => 
        app.id === appId ? { 
          ...app, 
          ai_score: updatedApp.ai_score, 
          ai_analysis: updatedApp.ai_analysis 
        } : app
      ));
      
      if (selectedApp?.id === appId) {
        setSelectedApp(prev => ({ 
          ...prev, 
          ai_score: updatedApp.ai_score, 
          ai_analysis: updatedApp.ai_analysis 
        }));
      }
      
      toast.success('AI Evaluation complete!');
    } catch (error) {
      console.error(error);
      toast.error('AI evaluation failed');
    } finally {
      setAnalyzingIds(prev => {
        const next = new Set(prev);
        next.delete(appId);
        return next;
      });
    }
  };

  const filteredApplications = filter === 'all'
    ? applications
    : applications.filter((app) => app.status === filter);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="text-green-400" size={20} />;
      case 'rejected':
        return <XCircle className="text-red-400" size={20} />;
      default:
        return <Clock className="text-amber-400" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-500/20 text-green-300';
      case 'rejected':
        return 'bg-red-500/20 text-red-300';
      default:
        return 'bg-amber-500/20 text-amber-300';
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-2">Application Review</h1>
          <p className="text-dark-400 mb-8">Review and manage candidate applications for your campus jobs</p>
        </motion.div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {['all', 'pending', 'accepted', 'rejected'].map((status) => (
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

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-premium h-24 bg-dark-700 animate-pulse" />
            ))}
          </div>
        ) : filteredApplications.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {filteredApplications.map((app, idx) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setSelectedApp(app)}
                  className={`card-premium cursor-pointer transition ${selectedApp?.id === app.id ? 'ring-2 ring-primary-500' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{app.student_name}</h3>
                      <p className="text-primary-400 text-sm">{app.job_title}</p>
                      <p className="text-dark-400 text-xs mt-1 flex items-center gap-2 flex-wrap">
                        <Building2 size={14} />
                        {app.recruiter_company || app.recruiter_name}
                        {app.job_campus_name && (
                          <span className="flex items-center gap-1"><MapPin size={14} /> {app.job_campus_name}</span>
                        )}
                      </p>
                      <p className="text-dark-400 text-xs mt-1">Applied: {new Date(app.created_at || app.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusIcon(app.status)}
                      <span className={`badge-primary ${getStatusColor(app.status)}`}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {selectedApp && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-1 sticky top-20 h-fit"
              >
                <div className="card-premium">
                  <h3 className="text-xl font-semibold mb-4">Candidate Details</h3>

                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-dark-400 text-sm mb-1">Name</p>
                      <p className="font-semibold">{selectedApp.student_name}</p>
                    </div>
                    <div>
                      <p className="text-dark-400 text-sm mb-1">Email</p>
                      <p className="font-semibold text-primary-400">{selectedApp.student_email}</p>
                    </div>
                    <div>
                      <p className="text-dark-400 text-sm mb-1">Position</p>
                      <p className="font-semibold">{selectedApp.job_title}</p>
                    </div>
                    <div>
                      <p className="text-dark-400 text-sm mb-1">Campus</p>
                      <p className="font-semibold">{selectedApp.job_campus_name || 'All campuses'}</p>
                    </div>
                    {(selectedApp.ai_score !== undefined && selectedApp.ai_score !== null) ? (
                      <div>
                        <p className="text-dark-400 text-sm mb-1">AI Score</p>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex-1 bg-dark-700 rounded-full h-2">
                            <div
                              className="bg-primary-500 h-2 rounded-full"
                              style={{ width: `${selectedApp.ai_score}%` }}
                            />
                          </div>
                          <span className="font-semibold">{selectedApp.ai_score}%</span>
                        </div>
                        {selectedApp.ai_analysis && (
                          <div className="bg-dark-800/40 p-3 rounded-lg border border-dark-700/50">
                            <p className="text-xs text-dark-300 italic leading-relaxed">
                             "{selectedApp.ai_analysis}"
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="pt-2">
                        <button
                          onClick={() => handleAiEvaluate(selectedApp.id)}
                          disabled={analyzingIds.has(selectedApp.id)}
                          className="w-full py-2 bg-gradient-to-r from-purple-600/30 to-blue-600/30 text-white text-sm font-semibold rounded-lg border border-purple-500/30 hover:from-purple-600/40 hover:to-blue-600/40 transition flex items-center justify-center gap-2"
                        >
                          {analyzingIds.has(selectedApp.id) ? (
                            <>
                              <Clock className="animate-spin" size={16} />
                              AI is thinking...
                            </>
                          ) : (
                            <>
                              <BarChart2 size={16} />
                              ✨ Evaluate with AI
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => handleStatusUpdate(selectedApp.id, 'accepted')}
                      disabled={selectedApp.status === 'accepted'}
                      className="w-full py-2 bg-green-500/20 text-green-300 font-semibold rounded-lg hover:bg-green-500/30 transition disabled:opacity-50"
                    >
                      ✓ Accept
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(selectedApp.id, 'rejected')}
                      disabled={selectedApp.status === 'rejected'}
                      className="w-full py-2 bg-red-500/20 text-red-300 font-semibold rounded-lg hover:bg-red-500/30 transition disabled:opacity-50"
                    >
                      ✕ Reject
                    </button>
                    <button className="w-full py-2 bg-dark-700 text-dark-300 font-semibold rounded-lg hover:bg-dark-600 transition">
                      View Resume
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="card-premium text-center py-12">
            <BarChart2 size={48} className="mx-auto text-dark-600 mb-4" />
            <p className="text-dark-400">No applications found</p>
          </div>
        )}
      </div>
    </div>
  );
}