import React from 'react'
import './dash.css';
import SidebarAccount from './sidebar/SidebarAccount';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { Link } from 'react-router-dom';


function AdminAccount() {
  return (
    <div>
      <div className="dash-container">
          <SidebarAccount/>


          {/* admin account informations and edit form  */ }
        <div className="admin-account">
              <div className="admin-title-container">
                <h1 className='adminTitle'> Admin Account</h1>
              </div>

              <div className="admin-infos-container">
                 <div className="admin-info-logo">
                    <AdminPanelSettingsIcon style={{fontSize:"50px"}}  className='admin-info-icon'/>
                  </div>
                  <div className="admin-infos">
                    <p>First name : Admin</p>
                    <p>Last name : Admin</p>
                    <p>Email : Admin@gmail.com</p>
                    <p>Adress : 15 somewhere, rue ..</p>
                    <p>Phone : +123456789</p>
                  </div>

               <Link to={"/editaccount"}><button className='button1' style={{marginTop:"25px"}}>Edit account</button></Link> 

              </div>

          </div> 
      </div>
    </div>
  )
}

export default AdminAccount