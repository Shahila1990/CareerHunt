// src/components/SavedJobsCard.jsx
import { useEffect, useState } from 'react';
import API from '../services/Api';
import JobCard from './JobCard';
import { toast } from 'react-toastify';

function SavedJobsCard() {
  const [savedJobs, setSavedJobs] = useState([]);

  const fetchSavedJobs = async () => {
    try {
      const res = await API.get('/user/saved');
      setSavedJobs(res.data);
    } catch (err) {
      toast.error('Something went wrong. Failed to save Job');
      console.error('Failed to load saved jobs', err);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const handleFilterClick = (tag) => {
    console.log('Tag clicked:', tag);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold text-veryDarkGrayishCyan text-center mb-8 sm:text-left">
        Saved Jobs
      </h1>
      <div className="space-y-10">
        {savedJobs.length > 0 ? (
          savedJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onFilterClick={handleFilterClick}
              isSavedPage={true}
              onRemove={fetchSavedJobs}
            />
          ))
        ) : (
          <p className="text-gray-500">No jobs saved yet.</p>
        )}
      </div>
    </div>
  );
}

export default SavedJobsCard;
