import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Briefcase, Building2 } from 'lucide-react';

export default function JobCard({ job }) {
  const companyName = job.recruiter_company || job.recruiter_name || job.company || 'CampusHire';
  const jobType = job.job_type || job.type || 'Full-time';
  const campusName = job.campus_name || job.drive_campus_name;

  return (
    <Link to={`/jobs/${job.id}`}>
      <div className="card-premium hover:shadow-premium-lg transition h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
            <p className="text-primary-400 font-medium flex items-center gap-2">
              <Building2 size={16} />
              {companyName}
            </p>
          </div>
          <span className="badge-primary">{jobType}</span>
        </div>

        <p className="text-dark-400 text-sm mb-4 line-clamp-2">{job.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-dark-700">
          {job.location && (
            <div className="flex items-center gap-2 text-sm text-dark-400">
              <MapPin size={16} className="text-secondary-400" />
              <span>{job.location}</span>
            </div>
          )}
          {job.salary && (
            <div className="flex items-center gap-2 text-sm text-dark-400">
              <DollarSign size={16} className="text-secondary-400" />
              <span>{job.salary}</span>
            </div>
          )}
          {job.experience && (
            <div className="flex items-center gap-2 text-sm text-dark-400">
              <Briefcase size={16} className="text-secondary-400" />
              <span>{job.experience} yrs</span>
            </div>
          )}
          {campusName && (
            <div className="flex items-center gap-2 text-sm text-dark-400 col-span-2">
              <MapPin size={16} className="text-secondary-400" />
              <span>Target campus: {campusName}</span>
            </div>
          )}
        </div>

        {job.skills && (
          <div className="flex flex-wrap gap-2">
            {job.skills.slice(0, 3).map((skill, idx) => (
              <span key={idx} className="text-xs bg-dark-700 text-dark-300 px-2 py-1 rounded-full">
                {skill}
              </span>
            ))}
            {job.skills.length > 3 && (
              <span className="text-xs bg-dark-700 text-dark-300 px-2 py-1 rounded-full">
                +{job.skills.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
