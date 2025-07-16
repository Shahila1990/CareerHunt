// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar'
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard'; 
import SavedJobs from './pages/SavedJobs';
import UserDashboard from './pages/UserDashboard'; 

function App() {
  return (
    <div className="bg-lightGrayishCyan min-h-screen font-spartan">
      <NavBar />
      <Header />

      <main className="relative -mt-8 px-4 max-w-6xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/saved" element={<SavedJobs />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route
            path="/profile"
            element={<Navigate to="/dashboard" replace />}
          />
        </Routes>
      </main>
    </div>
  );
}
export default App;
