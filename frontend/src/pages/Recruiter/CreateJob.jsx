import { useState } from 'react';
import { jobsAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ArrowLeft, Loader, Plus, X, MapPin, Building2 } from 'lucide-react';

export default function CreateJob() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [benefits, setBenefits] = useState([]);
  const [benefitInput, setBenefitInput] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    salary: '',
    job_type: 'full-time',
    experience: '',
    campus_name: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (idx) => {
    setSkills(skills.filter((_, i) => i !== idx));
  };

  const addBenefit = () => {
    if (benefitInput.trim()) {
      setBenefits([...benefits, benefitInput.trim()]);
      setBenefitInput('');
    }
  };

  const removeBenefit = (idx) => {
    setBenefits(benefits.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await jobsAPI.create({
        ...formData,
        skills,
        benefits,
      });

      toast.success('Job created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 pt-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          initial={{ opacity: 0 }}
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-primary-400 hover:text-primary-300 mb-8"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </motion.button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card-premium mb-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Create Job Opening</h1>
                <p className="text-dark-400">Post a new campus-targeted opportunity for candidates</p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-primary-400">
                <Building2 size={18} />
                Recruiter post
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="card-premium space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Job Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Senior Software Engineer"
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Job Type *</label>
              <select
                name="job_type"
                value={formData.job_type}
                onChange={handleChange}
                className="input-field"
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="internship">Internship</option>
                <option value="contract">Contract</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Target Campus *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 text-dark-400" size={20} />
                <input
                  type="text"
                  name="campus_name"
                  value={formData.campus_name}
                  onChange={handleChange}
                  placeholder="e.g., Main Campus, Downtown Campus"
                  required
                  className="input-field pl-10"
                />
              </div>
              <p className="text-xs text-dark-400 mt-2">Only students on this campus will see the job.</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Remote, New York, NY"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Salary Range</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g., $100,000 - $150,000"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Years of Experience Required</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="0"
                min="0"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Job Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the role and responsibilities..."
                rows={4}
                required
                className="input-field resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Requirements</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="List key requirements for the role"
                rows={3}
                className="input-field resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Required Skills</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  placeholder="Add a skill..."
                  className="input-field flex-1"
                />
                <button type="button" onClick={addSkill} className="btn-primary">
                  <Plus size={20} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <div key={idx} className="bg-dark-700 text-dark-300 px-3 py-1 rounded-full flex items-center gap-2">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(idx)}
                      className="hover:text-red-400 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Benefits & Perks</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={benefitInput}
                  onChange={(e) => setBenefitInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addBenefit();
                    }
                  }}
                  placeholder="Add a benefit..."
                  className="input-field flex-1"
                />
                <button type="button" onClick={addBenefit} className="btn-primary">
                  <Plus size={20} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="bg-dark-700 text-dark-300 px-3 py-1 rounded-full flex items-center gap-2">
                    {benefit}
                    <button
                      type="button"
                      onClick={() => removeBenefit(idx)}
                      className="hover:text-red-400 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Creating Job...
                </>
              ) : (
                'Create Job Opening'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
