import React, { useState, useEffect } from 'react';
import SidebarAccount from '../../sidebar/SidebarAccount'
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import jwtDecode from 'jwt-decode';
import '../user_style/editinfos.css';
import axios from 'axios';


function EditPwd() {
    const token = localStorage.getItem('token');
    const t=jwtDecode(token);
    const recruiterID = t._id; 

    //usestate 
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
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
           
          })
    
        }
        recruiter_infos();
       }) 
    // pages
    const navigate = useNavigate();
    const EditAccountPage =() =>{
        navigate('/useredit');

    }
    const EditCompanyPage =() =>{
        navigate('/usercompany');

    }

    const pwdPage = () =>  {
        navigate('/security');
    }

    const resetpwd = () => {
        navigate( `/resetpassword/${recruiterID}`);
      }

    const delete_account = () =>{
        navigate('/deleteaccount');

    }  


  return (
    <div className='EditPwd'>
        <div className="container">
            <SidebarAccount/>
            <div className="main">
            <h1 style={{textAlign:"Left", fontSize:"26px", marginTop:"29px"}}>Security Settings</h1>
             
             <div className="box-user-fullname">
               <div className="user-logo">
                       <AccountCircleIcon style={{ position:"relative", top:"20%", left:"20%",fontSize:"60px", color:"#c10000", }}  className='admin-info-icon'/>
               </div>
               <div className="full-name">
                 <h3 style={{textTransform:"capitalize", wordSpacing:"11px"}}> {firstName} {lastName} </h3>
                 
               </div>
           </div>
           <div className="box-edit-user">
              <div className="side-box">
                <button  onClick={EditAccountPage}>Edit profile</button>
                <button onClick={EditCompanyPage}>Edit company</button>
                <button className='selected-button' onClick={pwdPage} >Password & security</button>
              </div>
              <div className='container-edit-user'>
               <h4 style={{color:"#a1a5ad"}}>Password & security</h4>

                    <h5>Change Password</h5>
                    <div className="change-pwd">
                        <p style={{fontSize:"12.5px"}}>Choose a unique password to protect your account <br />
                        You will be redirected to another page to change password</p>
                        <button className='change-button' onClick={resetpwd}>Change Password</button>
                    </div>

                     <h5>Delete Account</h5>
                    <div className="delete-acc">
                        <p style={{fontSize:"12.5px"}}>This action can't be undone ! <br /> your profile and all your data will be deleted .</p>
                        <button className='delete-acc-button' onClick={delete_account}>Delete Account</button>

                    </div>
              </div>

            </div>
                

            </div>
        </div>
    </div>
  )
}

export default EditPwd