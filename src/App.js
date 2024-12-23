import './global.css'
import LoginPage from './components/LoginPage/loginPage';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import ProtectedRoute from './protectedRoute';
import HomePage from './components/HomePage/homePage';
import ForgotPassword from './components/LoginPage/forgotPassword';
import CreateAccount from './components/LoginPage/signup';
import {ToastContainer} from 'react-toastify';
const App=()=>{

  const token = localStorage.getItem('token');  // Check if the token exists in localStorage

  return(
    <>
    <Router>
       <Routes>
          {/* Redirect to /login if the user is not logged in, otherwise go to /home */}
          <Route path="/" element={<Navigate to={token ? "/home" : "/login"} replace />} />

          {/* If user is logged in, redirect them to /home, else show the login page */}
          <Route path="/login" element={token ? <Navigate to="/home" replace /> : <LoginPage />} />

          {/* If user is logged in, redirect them to /home, else show the create account page */}
          <Route path="/signup" element={token ? <Navigate to="/home" replace /> : <CreateAccount />} />

          
          {/* If user is logged in, redirect them to /home, else show the create account page */}
          <Route path="/forgot-password" element={token ? <Navigate to="/home" replace /> : <ForgotPassword />} />

             {/* If user is logged in, redirect them to /home, else show the create account page */}
             <Route path="/verify-account" element={token ? <Navigate to="/home" replace /> : <ForgotPassword />} />

          {/* Protected route for /home */}
          <Route path="/home" element={<ProtectedRoute element={HomePage} />} />
        </Routes>
  </Router>
  <ToastContainer />
  </>
  )
}


export default App