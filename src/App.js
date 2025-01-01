import './global.css'
import LoginPage from './components/LoginPage/loginPage';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import ProtectedRoute from './protectedRoute';

import ForgotPassword from './components/LoginPage/forgotPassword';
import CreateAccount from './components/LoginPage/signup';
import {ToastContainer} from 'react-toastify';
import Dashboard from './components/HomePage/Dashboard/dashboard';
import SideBar from './components/SideBar/sideBar';
import Payments from './components/HomePage/Payments/Payments';
import Settings from './components/HomePage/Settings/Settings';
import Notifications from './components/HomePage/Notifications/Notifications';
const App=()=>{

  const token = localStorage.getItem('token');  // Check if the token exists in localStorage

  return(
    <>
    <Router>
       <Routes>
          {/* Redirect to /login if the user is not logged in, otherwise go to /dashboard */}
          <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} replace />} />

          {/* If user is logged in, redirect them to /dashboard, else show the login page */}
          <Route path="/login" element={token ? <Navigate to="/dashboard" replace /> : <LoginPage />} />

          {/* If user is logged in, redirect them to /dashboard, else show the create account page */}
          <Route path="/signup" element={token ? <Navigate to="/dashboard" replace /> : <CreateAccount />} />

          
          {/* If user is logged in, redirect them to /dashboard, else show the create account page */}
          <Route path="/forgot-password" element={token ? <Navigate to="/dashboard" replace /> : <ForgotPassword />} />

             {/* If user is logged in, redirect them to /dashboard, else show the create account page */}
             <Route path="/verify-account" element={token ? <Navigate to="/dashboard" replace /> : <ForgotPassword />} />

          {/* Protected route for /dashboard */}
          <Route path="/" element={<SideBar />}>
            <Route path="dashboard" element={<ProtectedRoute element={Dashboard} />} />
            <Route path="payments" element={<ProtectedRoute element={Payments} />} />
            <Route path="settings" element={<ProtectedRoute element={Settings} />} />
            <Route path="notifications" element={<ProtectedRoute element={Notifications} />} />
          </Route>
       
        </Routes>
  </Router>
  <ToastContainer />
  </>
  )
}


export default App