// src/components/JobCard.jsx
import { formatDistanceToNow } from 'date-fns';
function JobCard({ job, onFilterClick }) {
  const tags = [
    job.role,
    job.level,
    ...(job.languages || []),
    ...(job.tools || []),
  ];

  return (
    <div
      className={`bg-white p-6 rounded shadow-md border-l-4 ${
        job.featured ? 'border-desaturatedDarkCyan' : 'border-transparent'
      } flex flex-col md:flex-row md:items-center`}
    >
      <img src={job.logo} alt={job.company} className="w-16 h-16 md:mr-6" />

      <div className="flex-1 mt-4 md:mt-0">
        <div className="flex items-center gap-4 mb-1">
          <h3 className="font-bold text-desaturatedDarkCyan">{job.company}</h3>
          {job.new && (
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
        <p className="text-darkGrayishCyan text-sm">
          {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })} •{' '}
          {job.contract} • {job.location}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4 md:mt-0 md:ml-auto">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onFilterClick(tag)}
            className="bg-lightGrayishCyanFilter text-desaturatedDarkCyan px-2 py-1 rounded text-sm font-semibold hover:bg-desaturatedDarkCyan hover:text-white transition"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

export default JobCard;
