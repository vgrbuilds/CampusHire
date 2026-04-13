import { useState, useEffect } from 'react';
import { resumesAPI } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Upload, FileText, Trash2, Star, Plus, Loader } from 'lucide-react';

export default function ResumesManager() {
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [primaryResumeId, setPrimaryResumeId] = useState(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const res = await resumesAPI.getByStudent(user?.id);
      setResumes(res.data);
      const primary = res.data.find(r => r.isPrimary);
      if (primary) setPrimaryResumeId(primary.id);
    } catch (error) {
      toast.error('Failed to load resumes');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (resumes.length >= 3) {
      toast.error('You can only upload up to 3 resumes');
      return;
    }

    if (!file.name.endsWith('.pdf')) {
      toast.error('Only PDF files are allowed');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('resume', file);
      
      const res = await resumesAPI.upload(formData);
      setResumes([...resumes, res.data]);
      toast.success('Resume uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload resume');
    } finally {
      setUploading(false);
    }
  };

  const handleSetPrimary = async (resumeId) => {
    try {
      await resumesAPI.update(resumeId, { isPrimary: true });
      setPrimaryResumeId(resumeId);
      setResumes(resumes.map(r => ({
        ...r,
        isPrimary: r.id === resumeId,
      })));
      toast.success('Primary resume updated!');
    } catch (error) {
      toast.error('Failed to update resume');
    }
  };

  const handleDelete = async (resumeId) => {
    try {
      await resumesAPI.delete(resumeId);
      setResumes(resumes.filter(r => r.id !== resumeId));
      toast.success('Resume deleted!');
    } catch (error) {
      toast.error('Failed to delete resume');
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-2">Resume Manager</h1>
          <p className="text-dark-400 mb-8">Manage up to 3 resumes for your applications</p>
        </motion.div>

        {/* Upload Section */}
        {resumes.length < 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-gradient mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Add New Resume</h3>
                <p className="opacity-90">You can upload up to {3 - resumes.length} more resume(s)</p>
              </div>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
                <div className="flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-dark-100 transition">
                  {uploading ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Plus size={20} />
                      Upload Resume
                    </>
                  )}
                </div>
              </label>
            </div>
          </motion.div>
        )}

        {/* Resumes List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="card-premium h-24 bg-dark-700 animate-pulse" />
            ))}
          </div>
        ) : resumes.length > 0 ? (
          <div className="space-y-4">
            {resumes.map((resume, idx) => (
              <motion.div
                key={resume.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card-premium flex items-center justify-between"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <FileText className="text-primary-400" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{resume.fileName}</h3>
                    <p className="text-dark-400 text-sm">
                      Uploaded: {new Date(resume.created_at || resume.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {resume.isPrimary && (
                    <badge className="badge-primary flex items-center gap-1">
                      <Star size={14} />
                      Primary
                    </badge>
                  )}
                  {!resume.isPrimary && (
                    <button
                      onClick={() => handleSetPrimary(resume.id)}
                      className="px-4 py-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition text-sm"
                    >
                      Set as Primary
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(resume.id)}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition text-red-400"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="card-premium text-center py-12">
            <Upload size={48} className="mx-auto text-dark-600 mb-4" />
            <p className="text-dark-400">No resumes uploaded yet. Upload your first resume to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}
