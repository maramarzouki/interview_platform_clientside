import React from 'react'
import './sidebar.css';
/*import './side.css';*/
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';

import { Link } from 'react-router-dom';



function SidebarAccount() {
  return (
    <div className='sidebar'>
    <div className="admin-logo">
      <img src="images/logo.png" alt="" width={"150px"} />
      {/*<h1>Hackup</h1>*/}
    </div>
    <div className="sidebar-wrapper">
      <div className="sidebar-menu">
{/*        <h3 className="side-title" style={{fontSize:"18px", fontWeight:"normal"}}>Admin Dashboard</h3>
*/}         <ul className="side-list">
            <li className="side-list-item ">
              <HomeIcon className='icon-sidebar' /> <Link to={"/admindash"}> <span>Home</span> </Link>
            </li>
            <li className="side-list-item">
              <GroupIcon className='icon-sidebar' /> <Link> <span>Users</span></Link>  
            </li>
            <li className="side-list-item">
             <AssignmentIcon className='icon-sidebar' />   <Link><span>Tests</span></Link>   
            </li>
            <li className="side-list-item selected">
              <ManageAccountsIcon className='icon-sidebar ' />   <Link to={"/adminaccount"}><span>Account</span></Link>   
            </li>
            <li className="side-list-item">
             <LogoutIcon className='icon-sidebar' />  <Link> <span>Logout</span></Link>   
            </li>

         </ul>
        </div>  
     
    </div>


</div>
  )
}

export default SidebarAccount