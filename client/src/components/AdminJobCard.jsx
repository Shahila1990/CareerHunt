import { toast } from 'react-toastify';

const AdminJobCard = ({ job, onEdit, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await fetch(`http://localhost:8000/api/jobs/${job._id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        onDelete();
      } catch (err) {
        toast.error('Something went wrong. Failed to delete Job');
        console.error(err);
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md flex justify-between items-center">
      <div>
        <h3 className="font-bold">{job.position}</h3>
        <p className="text-sm text-gray-500">
          {job.company} • {job.location}
        </p>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => onEdit(job)}
          className="px-3 py-1 bg-yellow-400 text-white rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminJobCard;
