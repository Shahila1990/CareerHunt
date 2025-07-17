// src/components/JobCard.jsx
import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../context/useAuth';
import API from '../services/Api';
import { toast } from 'react-toastify';

function JobCard({ job, onFilterClick, isSavedPage = false, onRemove }) {
  const { user, refreshSavedJobs } = useAuth();
  const [saved, setSaved] = useState(false);
  const isNew = new Date() - new Date(job.postedDate) < 5 * 24 * 60 * 60 * 1000;

  useEffect(() => {
    if (!user || !user.savedJobs) return;
    setSaved(user.savedJobs.includes(job._id));
  }, [user, job._id]);

  const handleSave = async () => {
    try {
      await API.post(`/user/save/${job._id}`);
      setSaved(true);
      await refreshSavedJobs();
      toast.success('Job saved successfully!');
    } catch (err) {
      if (err.response) {
        const status = err.response.status;

        if (status === 401) {
          toast.error('Unauthorized. Please log in.');
        } else if (status === 409) {
          toast.error('Job already saved.');
        } else if (status === 500) {
          toast.error('Server error. Try again later.');
        } else {
          toast.error(err.response.data?.message || 'Failed to save job.');
        }
      } else {
        toast.error('Network error. Please check your connection.');
      }
    }
  };

  const handleUnsave = async () => {
    try {
      await API.delete(`/user/save/${job._id}`);
      toast.success('Job Removed successfully!');
      await refreshSavedJobs();
      if (onRemove) onRemove(); // Refresh saved job list
    } catch (err) {
      if (err.response) {
        const status = err.response.status;

        if (status === 401) {
          toast.error('Unauthorized. Please log in again.');
        } else if (status === 404) {
          toast.error('Job not found.');
        } else if (status === 500) {
          toast.error('Server error. Please try later.');
        } else {
          toast.error(err.response.data?.message || 'Something went wrong.');
        }
      } else {
        toast.error('Network error. Please check your connection.');
      }
    }
  };

  const tags = [
    job.role,
    job.level,
    ...(job.languages || []),
    ...(job.tools || []),
  ];

  return (
    <div
      className={`relative bg-white pt-10 pb-6 px-6 rounded shadow-md border-l-4 ${
        job.featured ? 'border-desaturatedDarkCyan' : 'border-transparent'
      } flex flex-col md:flex-row md:items-center gap-y-4`}
    >
      {/* Logo (positioned half outside on mobile) */}
      <div className="absolute -top-6 left-6 w-12 h-12 md:static md:w-16 md:h-16 md:mr-6">
        <img
          src={job.logo}
          alt={job.company}
          className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border border-gray-200 mx-auto md:mx-0"
        />
      </div>

      {/* Main job content */}
      <div className="flex-1 mt-2 md:mt-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h3 className="font-bold text-desaturatedDarkCyan">{job.company}</h3>
          {isNew && (
            <span className="text-xs bg-desaturatedDarkCyan text-lightGrayishCyanFilter px-2 py-1 rounded-full uppercase">
              New!
            </span>
          )}
          {job.featured && (
            <span className="text-xs bg-veryDarkGrayishCyan text-lightGrayishCyanFilter px-2 py-1 rounded-full uppercase">
              Featured
            </span>
          )}
        </div>
        <h2 className="text-lg font-semibold text-veryDarkGrayishCyan hover:text-desaturatedDarkCyan">
          {job.position}
        </h2>
        <p className="text-darkGrayishCyan text-sm mt-1">
          {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })} •{' '}
          {job.contract} • {job.location}
        </p>
      </div>

      {/* Divider line on mobile */}
      <hr className="my-4 border-gray-200 md:hidden w-full" />

      {/* Tags and Save/Remove */}
      <div className="flex flex-wrap items-center gap-2 md:ml-auto">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onFilterClick(tag)}
            className="bg-lightGrayishCyanFilter text-desaturatedDarkCyan px-2 py-1 rounded text-sm font-semibold hover:bg-desaturatedDarkCyan hover:text-white transition"
          >
            {tag}
          </button>
        ))}
        {!user?.isAdmin && (
          <div className="w-full md:w-auto">
            {isSavedPage ? (
              <button
                onClick={handleUnsave}
                className="md:w-auto text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Remove
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={saved}
                className={`md:w-auto text-sm px-3 py-1 rounded ${
                  saved
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-teal-500 text-white hover:bg-teal-600'
                }`}
              >
                {saved ? 'Saved' : 'Save Job'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
  
}

export default JobCard;
