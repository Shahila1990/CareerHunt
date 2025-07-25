// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/NavBar';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import SavedJobs from './pages/SavedJobs';
import UserDashboard from './pages/UserDashboard';
import useAuthCheck from './context/useAuthCheck';

function App() {
  useAuthCheck()
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

        <ToastContainer
          position="top-right"
          autoClose={3000} // in ms
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </main>
    </div>
  );
}
export default App;
