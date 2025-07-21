import { useEffect, useState } from 'react';
import API from '../services/Api';
import AdminJobCard from '../components/AdminJobCard';
import JobGrowthChart from '../components/JobGrowthChart';
import JobForm from '../components/JobForm';
import { useAuth } from '../context/useAuth';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [jobPage, setJobPage] = useState(1);
  const jobsPerPage = 5;


  const { user } = useAuth();
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const indexOfLastJob = jobPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);


  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await API.get('/jobs?limit=1000');
      console.log(jobs);
      
      setJobs(res.data.jobs);
      setJobPage(1);
    } catch (err) {
      console.error('Error fetching jobs:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get('/admin/users', {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setUsers(res.data);
      setCurrentPage(1)
    } catch (err) {
      console.error('Error fetching users:', err.message);
    }
    
  };

  const fetchSummary = async () => {
    try {
      const res = await API.get('/admin/summary', {
        headers: {
          Authorization: `Bearer ${user?.token}`, 
        },
      });
      setSummary(res.data);
    } catch (err) {
      console.error('Error fetching summary:', err.message);
    }
  };


  useEffect(() => {
    fetchJobs();
    fetchSummary();
    fetchUsers(); // fetch once on mount
  }, []);

  const handleEdit = (job) => setEditingJob(job);
  const handleCancelEdit = () => setEditingJob(null);
  const handleRefresh = () => {
    fetchJobs();
    fetchSummary();
    setEditingJob(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pt-6 space-y-8">
      <h1 className="text-2xl font-bold text-desaturatedDarkCyan">
        Admin Dashboard
      </h1>
      <JobGrowthChart />

      {/* Tabs */}
      <div className="flex gap-4 border-b pb-2">
        <button
          onClick={() => setActiveTab('jobs')}
          className={`font-semibold ${
            activeTab === 'jobs'
              ? 'text-desaturatedDarkCyan border-b-2 border-desaturatedDarkCyan'
              : 'text-darkGrayishCyan hover:text-desaturatedDarkCyan'
          }`}
        >
          Jobs
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`font-semibold ${
            activeTab === 'users'
              ? 'text-desaturatedDarkCyan border-b-2 border-desaturatedDarkCyan'
              : 'text-darkGrayishCyan hover:text-desaturatedDarkCyan'
          }`}
        >
          Users
        </button>
      </div>

      {/* Overview Cards */}
      {summary && activeTab === 'jobs' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
          <div className="bg-desaturatedDarkCyan p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Total Jobs</h2>
            <p className="text-2xl">{summary.totalJobs}</p>
          </div>
          <div className="bg-veryDarkGrayishCyan p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-2xl">{summary.totalUsers}</p>
          </div>
          <div className="bg-teal-600 p-4 rounded shadow">
            <h2 className="text-lg font-semibold">New Jobs Today</h2>
            <p className="text-2xl">{summary.newJobsToday}</p>
          </div>
        </div>
      )}

      {/* Job Management Tab */}
      {activeTab === 'jobs' && (
        <>
          <JobForm
            job={editingJob}
            onCancel={handleCancelEdit}
            onSuccess={handleRefresh}
          />
          <div className="space-y-4">
            {loading ? (
              <p className="text-center text-gray-500">Loading jobs...</p>
            ) : jobs.length === 0 ? (
              <p className="text-center text-gray-500">
                No jobs available. Add one above.
              </p>
            ) : (
              <>
                <p className="text-sm text-darkGrayishCyan">
                  Total Jobs: {jobs.length}
                </p>
                {currentJobs.map((job) => (
                  <AdminJobCard
                    key={job._id}
                    job={job}
                    onEdit={handleEdit}
                    onDelete={handleRefresh}
                  />
                ))}
                <div className="flex justify-center mt-4 gap-2">
                  <button
                    onClick={() => setJobPage((prev) => Math.max(prev - 1, 1))}
                    disabled={jobPage === 1}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <span className="text-sm text-gray-600 self-center">
                    Page {jobPage} of {Math.ceil(jobs.length / jobsPerPage)}
                  </span>
                  <button
                    onClick={() =>
                      setJobPage((prev) =>
                        jobPage * jobsPerPage < jobs.length ? prev + 1 : prev
                      )
                    }
                    disabled={jobPage * jobsPerPage >= jobs.length}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {/* User List Tab */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          {currentUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow p-4 rounded border flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-desaturatedDarkCyan">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <p className="text-sm text-teal-600">
                {user.isAdmin ? 'Admin' : 'User'}
              </p>
            </div>
          ))}
          <div className="flex justify-center mt-4 gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm text-gray-600 self-center">
              Page {currentPage} of {Math.ceil(users.length / usersPerPage)}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  currentPage * usersPerPage < users.length ? prev + 1 : prev
                )
              }
              disabled={currentPage * usersPerPage >= users.length}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
