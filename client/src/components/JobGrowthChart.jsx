import { useEffect, useState } from 'react';
import API from '../services/Api';
import { toast } from 'react-toastify';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function JobGrowthChart() {
  const [data, setData] = useState([]);
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // Optional: fetch unique roles from your jobs
    const fetchRoles = async () => {
      try {
        const res = await API.get('/jobs'); // or a new endpoint to fetch distinct roles
        const uniqueRoles = [...new Set(res.data.jobs.map((job) => job.role))];
        setRoles(uniqueRoles);
      } catch (err) {
        toast.error('Something went wrong.');
        console.error('Failed to fetch roles', err);
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    const fetchGrowth = async () => {
      try {
        const res = await API.get(
          `/admin/job-growth${role ? `?role=${role}` : ''}`
        );
        const formatted = res.data.map((item) => ({
          month: item._id,
          jobs: item.count,
        }));
        setData(formatted);
      } catch (err) {
        console.error('Failed to fetch job growth', err);
      }
    };
    fetchGrowth();
  }, [role]);

  return (
    <div className="bg-white shadow rounded p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-desaturatedDarkCyan">
          Job Growth by Role
        </h2>
        <select
          className="border px-3 py-1 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">All Roles</option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="jobs"
            stroke="#0f766e"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default JobGrowthChart;
