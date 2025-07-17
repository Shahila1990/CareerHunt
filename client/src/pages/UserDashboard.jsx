import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserIcon, BookmarkIcon } from 'lucide-react';
import ProfileCard from '../components/ProfileCard';
import SavedJobsCard from '../components/SavedJobsCard';

function UserDashboard() {
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            activeTab === 'profile'
              ? 'bg-teal-600 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
          onClick={() => handleTabChange('profile')}
        >
          <UserIcon size={18} />
          Profile
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            activeTab === 'saved'
              ? 'bg-teal-600 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
          onClick={() => handleTabChange('saved')}
        >
          <BookmarkIcon size={18} />
          Saved Jobs
        </button>
      </div>

      {/* Animated Content */}
      <div className="relative min-h-[300px]">
        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ProfileCard />
            </motion.div>
          )}

          {activeTab === 'saved' && (
            <motion.div
              key="saved"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SavedJobsCard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default UserDashboard;
