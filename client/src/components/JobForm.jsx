import { useState, useEffect } from 'react';
import API from '../services/Api';

const defaultForm = {
  company: '',
  logo: '',
  position: '',
  role: '',
  level: '',
  postedAt: '',
  postedDate: '',
  contract: '',
  location: '',
  languages: [],
  tools: [],
};

const JobForm = ({ job, onCancel, onSuccess }) => {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (job) {
      setForm({
        ...defaultForm,
        ...job,
        languages: job.languages || [],
        tools: job.tools || [],
        postedDate: job.postedDate ? job.postedDate.split('T')[0] : '',
      });
    } else {
      setForm(defaultForm);
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (e, key) => {
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value.split(',').map((item) => item.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (job) {
        await API.put(`/jobs/${job._id}`, form);
      } else {
        await API.post('/jobs', form);
      }
      onSuccess();
    } catch (err) {
      alert('Failed to save job');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded space-y-4">
      <h2 className="text-lg font-semibold">
        {job ? 'Edit Job' : 'Add New Job'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
          required
        />
        <input
          name="logo"
          value={form.logo}
          onChange={handleChange}
          placeholder="Logo URL"
        />
        <input
          name="position"
          value={form.position}
          onChange={handleChange}
          placeholder="Position"
          required
        />
        <input
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Role"
        />
        <input
          name="level"
          value={form.level}
          onChange={handleChange}
          placeholder="Level"
        />
        <input
          name="postedAt"
          value={form.postedAt}
          onChange={handleChange}
          placeholder="Posted At (e.g. 1d ago)"
        />
        <input
          name="postedDate"
          type="date"
          value={form.postedDate}
          onChange={handleChange}
          placeholder="Posted Date"
        />
        <input
          name="contract"
          value={form.contract}
          onChange={handleChange}
          placeholder="Contract"
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
        />
        <input
          name="languages"
          value={form.languages.join(', ')}
          onChange={(e) => handleArrayChange(e, 'languages')}
          placeholder="Languages (comma-separated)"
        />
        <input
          name="tools"
          value={form.tools.join(', ')}
          onChange={(e) => handleArrayChange(e, 'tools')}
          placeholder="Tools (comma-separated)"
        />
      </div>
      <div className="flex justify-end space-x-2">
        {job && (
          <button
            onClick={onCancel}
            type="button"
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          {job ? 'Update' : 'Add'}
        </button>
      </div>
    </form>
  );
};

export default JobForm;
