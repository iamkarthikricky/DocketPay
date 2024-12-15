import './global.css'
import LoginPage from "./components/LoginPage/loginPage"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App=()=>{
  return(
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </div>
  </Router>
  )
}


export default App