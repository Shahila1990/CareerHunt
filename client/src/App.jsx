// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard'; 
import SavedJobs from './pages/SavedJobs'; 

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
        </Routes>
      </main>
    </div>
  );
}
export default App;
