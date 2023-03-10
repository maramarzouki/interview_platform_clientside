import React, {useState} from 'react'
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import './sidebaruser.css';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Modal } from 'antd';


function SidebarUser() {


  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);  
    logout();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const logout = () =>{
      localStorage.removeItem("token");
      navigate("/loginform");
    
  }






  return (
    <div className='sidebar'>
      <Modal title="Confirm Logout" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Are you sure you want to logout ?</p>
      </Modal>
    <div className="admin-logo">
      <img src="images/logo.png" alt="" width={"150px"} />
      {/*<h1>Hackup</h1>*/}
    </div>
    <div className="sidebar-wrapper">
      <div className="sidebar-menu">
         <ul className="side-list">
            <li className="side-list-item ">
              <HomeIcon className='icon-sidebar' /> <Link to={"/admindash"}> <span>Home</span> </Link>
            </li>
            <li className="side-list-item">
              <GroupIcon className='icon-sidebar' /> <Link> <span>Interviews</span></Link>  
            </li>
            <li className="side-list-item">
             <AssignmentIcon className='icon-sidebar' />   <Link><span>Tests</span></Link>   
            </li>
            <li className="side-list-item selected">
              <ManageAccountsIcon className='icon-sidebar ' />   <Link to={"/userdash"}><span>Account</span></Link>   
            </li>
              <div className="logout-wrapper">
              <LogoutIcon style={{marginLeft:"25px"}}/> <button className='logout' onClick={showModal} style={{background:"black", color:"white", width:"100px", height:"30px",border: "1px solid white", fontSize:"17px", marginLeft: "15px", border:"none", cursor:"pointer"}}>  Logout</button> 
              </div>
         </ul>
        </div>  
     
    </div>



</div>
  )
}

export default SidebarUser