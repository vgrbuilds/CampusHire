import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobsAPI, applicationsAPI } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ArrowLeft, MapPin, DollarSign, Briefcase, Users, Share2, Star, Loader } from 'lucide-react';

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const companyName = job?.recruiter_company || job?.recruiter_name || job?.company || 'CampusHire';
  const jobType = job?.job_type || job?.type || 'Full-time';
  const campusName = job?.campus_name || job?.drive_campus_name;

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const res = await jobsAPI.getById(id);
      setJob(res.data);
      
      // Check if user has already applied
      if (isAuthenticated && user?.role === 'student') {
        const applicationsRes = await applicationsAPI.getByStudent(user.id);
        const alreadyApplied = applicationsRes.data.some(app => String(app.job_id) === String(id));
        setIsApplied(alreadyApplied);
      }
    } catch (error) {
      toast.error('Failed to load job details');
      navigate('/jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to apply');
      navigate('/login');
      return;
    }

    if (user?.role !== 'student') {
      toast.error('Only students can apply for jobs');
      return;
    }

    setApplying(true);
    try {
      await applicationsAPI.create({
        job_id: Number(id),
        student_id: user.id,
        form_version_id: null,
        resume_id: null,
        answers: {},
        status: 'pending',
      });
      setIsApplied(true);
      toast.success('Application submitted successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-500" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-dark-400 text-lg">Job not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate('/jobs')}
          className="flex items-center gap-2 text-primary-400 hover:text-primary-300 mb-8"
        >
          <ArrowLeft size={20} />
          Back to Jobs
        </motion.button>

        {/* Job Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{job.title}</h1>
              <p className="text-xl text-primary-400 font-semibold mb-2">{companyName}</p>
              <span className="badge-primary">{jobType}</span>
            </div>
            <button className="p-3 hover:bg-dark-700 rounded-lg transition">
              <Share2 size={24} />
            </button>
          </div>

          {/* Job Meta */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-dark-700">
            {job.location && (
              <div>
                <p className="text-dark-400 text-sm mb-1">Location</p>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-secondary-400" />
                  <span className="font-semibold">{job.location}</span>
                </div>
              </div>
            )}
            {job.salary && (
              <div>
                <p className="text-dark-400 text-sm mb-1">Salary</p>
                <div className="flex items-center gap-2">
                  <DollarSign size={18} className="text-secondary-400" />
                  <span className="font-semibold">{job.salary}</span>
                </div>
              </div>
            )}
            {job.experience && (
              <div>
                <p className="text-dark-400 text-sm mb-1">Experience</p>
                <div className="flex items-center gap-2">
                  <Briefcase size={18} className="text-secondary-400" />
                  <span className="font-semibold">{job.experience} years</span>
                </div>
              </div>
            )}
            {campusName && (
              <div>
                <p className="text-dark-400 text-sm mb-1">Target Campus</p>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-secondary-400" />
                  <span className="font-semibold">{campusName}</span>
                </div>
              </div>
            )}
            <div>
              <p className="text-dark-400 text-sm mb-1">Applications</p>
              <div className="flex items-center gap-2">
                <Users size={18} className="text-secondary-400" />
                <span className="font-semibold">{job.applicationsCount || 0}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
            {/* Description */}
            <div className="card-premium mb-8">
              <h2 className="text-2xl font-bold mb-4">About the Role</h2>
              <p className="text-dark-300 whitespace-pre-line mb-6">{job.description}</p>
            </div>

            {/* Requirements */}
            {job.requirements && (
              <div className="card-premium mb-8">
                <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                <p className="text-dark-300 whitespace-pre-line">{job.requirements}</p>
              </div>
            )}

            {/* Skills */}
            {job.skills && job.skills.length > 0 && (
              <div className="card-premium mb-8">
                <h2 className="text-2xl font-bold mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-3">
                  {job.skills.map((skill, idx) => (
                    <span key={idx} className="bg-dark-700 text-dark-300 px-4 py-2 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div className="card-premium">
                <h2 className="text-2xl font-bold mb-4">Benefits</h2>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-dark-300">
                      <Star size={18} className="text-accent-500 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="card-premium mb-6">
                <p className="text-dark-400 text-sm mb-4">Posting Date: {new Date(job.created_at || job.createdAt).toLocaleDateString()}</p>
                {campusName && (
                  <p className="text-dark-400 text-sm mb-4">Visible to: {campusName}</p>
                )}
                
                {isApplied ? (
                  <button disabled className="w-full py-3 bg-green-500/20 text-green-300 font-semibold rounded-lg">
                    ✓ Application Submitted
                  </button>
                ) : (
                  <button
                    onClick={handleApply}
                    disabled={applying}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {applying ? (
                      <>
                        <Loader size={20} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Apply Now'
                    )}
                  </button>
                )}
              </div>

              {/* Company Info Card */}
              <div className="card-premium">
                <h3 className="text-lg font-semibold mb-4">About Company</h3>
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center text-primary-400 mb-4">
                  <Briefcase size={24} />
                </div>
                <p className="text-dark-400 text-sm mb-4">{companyName}</p>
                <button className="w-full py-2 border border-primary-500 text-primary-400 rounded-lg hover:bg-primary-500/10 transition">
                  Visit Company
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
