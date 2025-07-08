import { useEffect, useState } from 'react';
import API from '../services/api';
import jobData from '../data.json';
import JobCard from '../components/JobCard';
import FilterBar from '../components/FilterBar';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    setJobs(jobData);
    // const loadJobs = async () => {
    //   try {
    //     const response = await API.get('/jobs');
    //     setJobs(response.data);
    //   } catch (err) {
    //     console.error('Failed to fetch jobs:', err.message);
    //   }
    // };

    // loadJobs();
  }, []);

  const handleFilterAdd = (tag) => {
    if (!filters.includes(tag)) {
      setFilters((prev) => [...prev, tag]);
    }
  };

  const handleFilterRemove = (tag) => {
    setFilters((prev) => prev.filter((f) => f !== tag));
  };

  const handleClearFilters = () => {
    setFilters([]);
  };

  const filteredJobs = filters.length
    ? jobs.filter((job) =>
        filters.every((filter) =>
          [
            job.role,
            job.level,
            ...(job.languages || []),
            ...(job.tools || []),
          ].includes(filter)
        )
      )
    : jobs;

  return (
    <>
      {filters.length > 0 && (
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="-mt-12">
            <FilterBar
              filters={filters}
              onRemove={handleFilterRemove}
              onClear={handleClearFilters}
            />
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-12">
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job._id || job.id}
              job={job}
              onFilterClick={handleFilterAdd}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
