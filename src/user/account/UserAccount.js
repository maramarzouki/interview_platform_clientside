import React, { useEffect, useState } from 'react'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import '../user_style/useraccount.css'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import SidebarAccount from '../../sidebar/SidebarAccount'
function UserAccount() {

  // get user infos
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  // const [country, setCountry] = useState('')
  const [size, setSize] = useState('')
  const [domain, setDomain] = useState('')
  // const [id, setid] = useState('')


  const token = localStorage.getItem('token');
  const xtoken = jwtDecode(token);
  const recuiterID = xtoken._id;

  const recruiter_infos = () =>{
    axios.get(`http://localhost:3001/recru_info/${recuiterID}`)
    .then(recruiter => {
      setFirstName(recruiter.data.first_name)
      setLastName(recruiter.data.last_name)
      setEmail(recruiter.data.email)
    }).catch(err=> {
      console.log(err);
    })

  }

  const company_info = () =>{
    axios.get(`http://localhost:3001/get_company_info/${recuiterID}`)
    .then(company=>{
      setCompanyName(company.data.company_name)
      setSize(company.data.size)
      setDomain(company.data.domain)
    }).catch(err=>{
      console.log(err);
    })
  }

  useEffect(() => {
    recruiter_infos();
    company_info();
   }) 







  return (
    <div className='UserAccount'>
         <div className="container">
            <SidebarAccount/>

        <div className="main">
            <h1 style={{textAlign:"Left", fontSize:"26px", marginTop:"29px"}}> Profile</h1>

            <div className="box-user-fullname">
                <div className="user-logo">
                        <AccountCircleIcon style={{ position:"relative", top:"20%", left:"20%",fontSize:"60px", color:"#c10000", }}  className='admin-info-icon'/>
                </div>
                <div className="full-name">
                  <h3 style={{textTransform:"capitalize", wordSpacing:"11px"}}>{firstName} {lastName} </h3>
                  <p>Check your profile   Information</p>
                </div>
            </div>
            <div className="box-user-container">
              <h4 style={{color:"#a1a5ad", paddingLeft:"50px"}}>Profile info</h4>
                <div className="userInfos">
                  <div className="personalInfos">
                      <h5>Personal</h5>

                      <p>First Name: <span style={{textTransform:"capitalize"}}>{firstName}</span></p>
                      <p>Last Name: <span style={{textTransform:"capitalize"}}>{lastName}</span></p>
                      <p>Email: <span >{email}</span></p>
                  </div>
                  <div className="companyInfos">
                    <h5>Company</h5>
                    <p>Company Name: <span style={{textTransform:"capitalize"}}>{companyName}</span></p>
                      <p>Domain: <span style={{textTransform:"capitalize"}}>{domain}</span></p>
                      <p>Company Size: <span style={{textTransform:"capitalize"}}>{size}</span></p>
                  </div>
                </div>
                <Link to={'/useredit'}><button className='button1' style={{marginTop:"18px"}}>Edit account</button></Link> 

            </div>
              

              {/* <div className="user-infos-container">
                 <div className="user-info-logo">
                    <AccountCircleIcon style={{ position:"relative", top:"25%", left:"25%",fontSize:"50px", color:"#c10000", }}  className='admin-info-icon'/>
                  </div>
                  <div className="user-infos">
                    <p><span style={{marginRight:"20px"}}>First name : </span> {firstName} </p>
                    <p><span style={{marginRight:"20px"}}>Last name :</span> {lastName} </p>
                    <p><span style={{marginRight:"55px"}}>Email : </span> {email}</p>
                    <p><span style={{marginRight:"22px"}}>Company : </span> {companyName} </p>
                    <p><span style={{marginRight:"50px"}}>Sector : </span> {sector}</p>
                    <p><span style={{marginRight:"70px"}}>Size:</span> {size} </p>
                    <p><span style={{marginRight:"40px"}}>Country: </span> {country} </p>
                    
                  </div>

               <Link to={'/useredit'}><button className='button1' style={{marginTop:"18px"}}>Edit account</button></Link> 

              </div> */}

          
        </div>
            

        </div>
    </div>
  )
}

export default UserAccount