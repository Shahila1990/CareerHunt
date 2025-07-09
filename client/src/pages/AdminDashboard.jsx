import { useEffect, useState } from 'react';
import API from '../services/Api';
import AdminJobCard from '../components/AdminJobCard';
import JobForm from '../components/JobForm';

const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

  const fetchJobs = async () => {
    try {
      const res = await API.get('/jobs');
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs:', err.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleEdit = (job) => setEditingJob(job);
  const handleCancelEdit = () => setEditingJob(null);
  const handleRefresh = () => {
    fetchJobs();
    setEditingJob(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pt-6 space-y-6">
      <h1 className="text-2xl font-bold text-desaturatedDarkCyan">
        Admin Dashboard
      </h1>
      <JobForm
        job={editingJob}
        onCancel={handleCancelEdit}
        onSuccess={handleRefresh}
      />

      <div className="space-y-4">
        {jobs.map((job) => (
          <AdminJobCard
            key={job._id}
            job={job}
            onEdit={handleEdit}
            onDelete={handleRefresh}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
