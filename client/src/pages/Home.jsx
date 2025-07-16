import { useEffect, useState } from 'react';
import API from '../services/Api';

import FilterBar from '../components/FilterBar';
import JobList from '../components/JobList';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState([]);
  

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const response = await API.get('/jobs');
        setJobs(response.data);
      } catch (err) {
        console.error('Failed to fetch jobs:', err.message);
      }
    };

    loadJobs();
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
        <div className="relative z-20 -mt-12 max-w-6xl mx-auto px-4">
          <div className="-mt-12">
            <FilterBar
              filters={filters}
              onRemove={handleFilterRemove}
              onClear={handleClearFilters}
            />
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto px-4 pt-12 pb-12">
        <JobList jobs={filteredJobs} onFilterClick={handleFilterAdd} />
      </div>
    </>
  );
}

export default Home;
