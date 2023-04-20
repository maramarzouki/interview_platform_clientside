import React, {useState} from 'react'
import './sidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import {  Modal } from 'antd';

function SidebarInterview() {
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
        navigate("/");
      
    }

  return (
    <div className='sidebar-menu'>
        <Modal title="Confirm Logout" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okButtonProps={{style:{backgroundColor: '#C10000'}}}>
        <p>Are you sure you want to logout ?</p>
      </Modal>

        <div className='side-logo'> 
            <img src="images/logo2.png" alt="logo" width={"120px"}/> 
            <h3>Interviews</h3>
        </div>
        <ul>
            <li>
                <Link to={'/userdash'}><i class="fas fa-house-user"></i><span>Dashboard</span></Link>
            </li>
            <li>
                <Link to={'/calendar'}><i class="fas fa-calendar"></i><span>Calendar</span></Link>
            </li>
           
            <li className="selected">
                 <Link to={'/interviews'}><i class="fas fa-video"></i><span>Interviews</span></Link>
            </li>
            <li>
                <Link to={'/tests'}><i class="fas fa-folder"></i><span>Tests</span></Link>
            </li>
            <div className="account-logout-wrapper" style={{marginTop:"120px"}}>
                <li >
                    <Link to={'/account'}><i class="fas fa-user"></i><span>Account</span></Link>
                </li>
                <li>
                    <Link onClick={showModal}> <i><LogoutIcon/></i>  <span style={{marginTop:"-4px"}}>Logout</span></Link>
                </li>
            </div>
        </ul>
  
    </div>
  )
}

export default SidebarInterview