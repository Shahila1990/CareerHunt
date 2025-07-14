import JobCard from './JobCard';

const JobList = ({ jobs, onFilterClick }) => {
  if (jobs.length === 0) {
    return <p className="text-center text-darkGrayishCyan">No jobs found.</p>;
  }

  return (
    <div className="space-y-10">
      {jobs.map((job) => (
        <JobCard
          key={job._id || job.id}
          job={job}
          onFilterClick={onFilterClick}
        />
      ))}
    </div>
  );
};

export default JobList;
