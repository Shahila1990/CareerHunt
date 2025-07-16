import React from 'react';
import ProfileCard from '../components/ProfileCard';
import SavedJobsCard from '../components/SavedJobsCard';


function UserDashboard() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">
      
      <h1 className="text-2xl font-bold text-center text-darkCyan">
        User Dashboard
      </h1>
      <ProfileCard />
      <SavedJobsCard />

     
    </div>
  );
}

export default UserDashboard;
