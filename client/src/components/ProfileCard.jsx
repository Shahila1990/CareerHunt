import { useState } from 'react';
import API from '../services/Api';
import { useAuth } from '../context/useAuth';

function ProfileCard({ onSuccess }) {
  const { user, refreshSavedJobs } = useAuth(); 
  const [name, setName] = useState(user?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  if (!user) {
    return (
      <p className="text-center text-gray-500">
        Please log in to view this page.
      </p>
    );
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(
        '/user/profile',
        { name, currentPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setMessage('Profile updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setShowPasswordForm(false);
      await refreshSavedJobs();
      onSuccess?.();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update profile.');
    }
  };

  return (
    <div className="bg-white rounded shadow p-6 space-y-4">
      <h2 className="text-lg font-bold text-desaturatedDarkCyan">My Profile</h2>
      {message && <p className="text-sm text-teal-600">{message}</p>}

      <div>
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
      </div>

      <div className="flex gap-4 mt-2">
        <button
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          onClick={() => setShowPasswordForm((prev) => !prev)}
        >
          {showPasswordForm ? 'Cancel' : 'Change Password'}
        </button>
      </div>

      {showPasswordForm && (
        <form onSubmit={handleUpdate} className="space-y-4 mt-4">
          <div>
            <label className="block font-medium mb-1">Current Password</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">New Password</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
            Save Password
          </button>
        </form>
      )}
    </div>
  );
}

export default ProfileCard;
