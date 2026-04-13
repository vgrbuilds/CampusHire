import { useState } from 'react';
import { drivesAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ArrowLeft, Loader, Calendar } from 'lucide-react';

export default function CreateDrive() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    company: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const drive = await drivesAPI.create(formData);
      toast.success('Recruitment drive created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create drive');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 pt-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-primary-400 hover:text-primary-300 mb-8"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </motion.button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card-premium mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Recruitment Drive</h1>
            <p className="text-dark-400">Start a new recruitment drive for your organization</p>
          </div>

          <form onSubmit={handleSubmit} className="card-premium space-y-6">
            {/* Drive Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Drive Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Campus Recruitment 2024"
                required
                className="input-field"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium mb-2">Company Name *</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your company name"
                required
                className="input-field"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your recruitment drive..."
                rows={4}
                className="input-field resize-none"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Start Date *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 text-dark-400" size={20} />
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="input-field pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End Date *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 text-dark-400" size={20} />
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="input-field pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Creating Drive...
                </>
              ) : (
                'Create Recruitment Drive'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
