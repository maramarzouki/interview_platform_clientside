import './App.css';
import { Routes, Route } from "react-router-dom"
import Login from './login/Login';
import DashboardAdmin from './admin/DashboardAdmin';
import SignupForm from './signup/SignupForm';
import AdminAccount from './admin/AdminAccount';
import EditAccount from './admin/EditAccount';
import UserDashboard from './user/UserDashboard';
import EditUserAccount from './user/EditUserAccount';
import LoginForm from './login/LoginForm';
import SignUp from './signup/SignUp';

function App() {
  return (
      <div className="App">
        
            <Routes>
                
            <Route path="/" element={ <LoginForm/> } />
            {/* <Route path="/signupform" element={ <SignupForm/> } /> */}
            <Route path="/signup" element={ <SignUp/> } />
            {/* <Route path="/loginform" element={ <LoginForm/> } /> */}
            <Route path="/admindash" element={ <DashboardAdmin/> } />
            <Route path="/adminaccount" element={ <AdminAccount/> } />
            <Route path="/editaccount" element={ <EditAccount/> } />
            <Route path="/userdash" element={ <UserDashboard/> } />
            <Route path="/useredit/:id" element={ <EditUserAccount/> } />
            </Routes>
    </div> 
  );
}

export default App;
