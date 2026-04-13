import { useState, useEffect } from 'react';
import { jobsAPI } from '../../services/api';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Search, Filter, TrendingUp, MapPin } from 'lucide-react';
import JobCard from '../../components/Jobs/JobCard';

export default function JobsListing() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await jobsAPI.getAll();
      setJobs(res.data);
    } catch (error) {
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const companyName = job.recruiter_company || job.recruiter_name || job.company || '';
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (job.campus_name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || (job.job_type || job.type) === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-dark-900 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Job Opportunities</h1>
          <p className="text-dark-400">Discover amazing career opportunities from top companies</p>
        </motion.div>

        <div className="mb-6 rounded-2xl border border-dark-700 bg-dark-800/60 p-4 flex items-center gap-3 text-sm text-dark-300">
          <MapPin size={18} className="text-primary-400" />
          These jobs are filtered to your campus on the backend. Use search to narrow the feed further.
        </div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3.5 text-dark-400" size={20} />
              <input
                type="text"
                placeholder="Search jobs, companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-3.5 text-dark-400" size={20} />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="input-field pl-10"
              >
                <option value="all">All Job Types</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="internship">Internship</option>
                <option value="contract">Contract</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="card-premium h-64 bg-dark-700 animate-pulse" />
            ))}
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="card-premium text-center py-20">
            <TrendingUp size={48} className="mx-auto text-dark-600 mb-4" />
            <p className="text-dark-400 text-lg">No jobs found matching your criteria</p>
            <p className="text-dark-500 text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Results Count */}
        {!loading && (
          <div className="mt-8 text-center text-dark-400">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </div>
        )}
      </div>
    </div>
  );
}
