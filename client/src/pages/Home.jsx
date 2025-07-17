import { useEffect, useState } from 'react';
import API from '../services/Api';

import FilterBar from '../components/FilterBar';
import JobList from '../components/JobList';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/jobs?page=${page}&limit=5`);
      setJobs(res.data.jobs); 
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to fetch jobs:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [page]);

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

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

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
        {loading ? (
          <p className="text-center text-darkGrayishCyan">Loading jobs...</p>
        ) : (
          <>
            <JobList jobs={filteredJobs} onFilterClick={handleFilterAdd} />
            {/* Pagination Controls */}
            <div className="flex justify-center mt-10 gap-2 flex-wrap">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-4 py-2 rounded ${
                    page === i + 1
                      ? 'bg-teal-600 text-white'
                      : 'bg-white border text-gray-600'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
