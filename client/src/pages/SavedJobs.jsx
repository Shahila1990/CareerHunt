import { useEffect, useState } from 'react';
import API from '../services/Api';
import JobCard from '../components/JobCard';

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await API.get('/user/saved');
        setSavedJobs(res.data);
      } catch (err) {
        console.error('Failed to load saved jobs', err);
      }
    };

    fetchSavedJobs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-4">Saved Jobs</h1>
      <div className="space-y-4">
        {savedJobs.length > 0 ? (
          savedJobs.map((job) => (
            <JobCard key={job._id} job={job} onFilterClick={() => {}} />
          ))
        ) : (
          <p className="text-gray-500">No jobs saved yet.</p>
        )}
      </div>
    </div>
  );
}

export default SavedJobs;
