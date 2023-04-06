import './App.css';
import { Routes, Route } from "react-router-dom"
import Login from './login_page/Login';
import Signup from './signup_page/Signup';
import ForgotPassword from './login_page/ForgotPassword';
import NewPassword from './login_page/NewPassword';
import Userdash from './user/Userdash';
import UserAccount from './user/account/UserAccount';
import EditAccount from './user/account/EditAccount';
import Activation from './signup_page/Activation';
import DeleteAccount from './user/account/DeleteAccount';
import Congtrates from './signup_page/Congtrates';
import EditCompany from './user/account/EditCompany';
import EditPwd from './user/account/EditPwd';
import Tests from './tests/Tests';
import TestDetail from './tests/TestDetail';
import Calendar from './calendar/Calendar';
import Interviews from './interviews/Interviews';

function App() {
  return (
    <div className="App">
      <Routes>
                
       <Route path="/" element={ <Login/> } />
       <Route path="/signup" element={ <Signup/> } />
       <Route path="/confirm/:activationcode" element={ <Activation/> } />

       <Route path="/forgotpassword" element={ <ForgotPassword/> } />
       <Route path="/userdash" element={ <Userdash/> } />
       <Route path="/account" element={ <UserAccount/> } />
       <Route path="/useredit" element={ <EditAccount/> } />
       <Route path="/usercompany" element={ <EditCompany/> } />
       <Route path="/deleteaccount" element={ <DeleteAccount/> } />
       <Route path="/congrates" element={ <Congtrates/> } />
       <Route path='/resetpassword/:userID' element={<NewPassword/>} />
       <Route path="/security" element={ <EditPwd/> } />

       <Route path="/tests" element={ <Tests/> } />
       <Route path="/testdetail" element={ <TestDetail/> } />

       <Route path="/calendar" element={ <Calendar/> } />
       <Route path="/interviews" element={ <Interviews/> } />



       {/* <Route path='/resetpassword' element={<NewPassword/>} />  */}


      </Routes>          
     
    </div>
  );
}

export default App;
