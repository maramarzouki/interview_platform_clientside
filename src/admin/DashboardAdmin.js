import React from 'react'
import Sidebar from './sidebar/Sidebar'
import './dash.css';

function DashboardAdmin() {
  return (
    <div className='dashboard'>
      <div className="dash-container">
          <Sidebar/>
         <div className="others">
             <h1 style={{textAlign:"center", marginTop:"5%"}}>Welcome Admin !</h1>
          </div> 
      </div>
      
    </div>
  )
}

export default DashboardAdmin