import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminPage from './apps/admin/AdminPage';
import StaffPage from './apps/staff/StaffPage';
import './App.css'
import MenuPage from './pages/menu-page';
import { ROUTE } from 'consts/route.const';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/staff/*" element={<StaffPage />} />

          {/* Use case: for all roles */}
          <Route path="/" element={<MenuPage />} />
          <Route path={ROUTE.MENU} element={<MenuPage />} />
          <Route path={ROUTE.LOGIN} element={<Navigate to="/staff" />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </RecoilRoot>
  )
}

export default App;
