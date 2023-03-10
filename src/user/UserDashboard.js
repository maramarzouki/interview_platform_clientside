import React, { useEffect, useState } from 'react'
import SidebarUser from './sidebar/SidebarUser'
import './userdash.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

import axios from 'axios';
import jwtDecode from 'jwt-decode';


function UserDashboard() {


    // get user infos
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [country, setCountry] = useState('')
    const [size, setSize] = useState('')
    const [sector, setSector] = useState('')
    const [id, setid] = useState('')


   useEffect(() => {
    const recruiter_infos = () =>{
      const token = localStorage.getItem('token');
      const id = jwtDecode(token);

      axios.get(`http://localhost:3001/recru_info/${id._id}`)
      .then(recruiter => {
        setid(recruiter.data._id)
        setFirstName(recruiter.data.first_name)
        setLastName(recruiter.data.last_name)
        setEmail(recruiter.data.email)
        setCompanyName(recruiter.data.company_name)
        setCountry(recruiter.data.country)
        setSize(recruiter.data.size)
        setSector(recruiter.data.sector)
      })

    }
    recruiter_infos();
   }) 







  return (
    <div className='dashboard'>
    <div className="dash-container">
        <SidebarUser/>
        <div className="user-account">
              <div className="user-title-container">
                <h1 className='userTitle' style={{marginLeft:"39%"}}> User Account</h1>
              </div>

              <div className="user-infos-container">
                 <div className="user-info-logo">
                    <AccountCircleIcon style={{fontSize:"50px"}}  className='admin-info-icon'/>
                  </div>
                  <div className="user-infos">
                    <p><span style={{marginRight:"20px"}}>First name : </span>  {firstName}</p>
                    <p><span style={{marginRight:"20px"}}>Last name :</span> {lastName}</p>
                    <p><span style={{marginRight:"55px"}}>Email : </span>{email}</p>
                    <p><span style={{marginRight:"22px"}}>Company : </span>{companyName} </p>
                    <p><span style={{marginRight:"50px"}}>Sector : </span>{sector}</p>
                    <p><span style={{marginRight:"70px"}}>Size:</span> {size}</p>
                    <p><span style={{marginRight:"40px"}}>Country: </span>{country}</p>
                    
                  </div>

               <Link to={`/useredit/${id}`}><button className='button1' style={{marginTop:"18px"}}>Edit account</button></Link> 

              </div>

          </div>
    </div>
    
  </div>
  )
}

export default UserDashboard