import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminPage from './apps/admin/AdminPage';
import StaffPage from './apps/staff/StaffPage';
import UserPage from './apps/user/UserPage';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/staff/*" element={<StaffPage />} />
        <Route path="/" element={<UserPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
