import React, { useState, useEffect } from 'react';
import SidebarAccount from '../../sidebar/SidebarAccount'
import '../user_style/editinfos.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import jwtDecode from 'jwt-decode';
//notifications with toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function EditAccount() {


  const token = localStorage.getItem('token');
  const t=jwtDecode(token);
  const recruiterID = t._id; 

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");


    const {register, handleSubmit, formState : {errors}} = useForm({
        defaultValues:{
          ontouched:{
          first_name:'',
          last_name:'',
          email:''
        }}
      })
    

   

      useEffect(() => {
        const personnal_info = () => {
          axios.get(`http://localhost:3001/recru_info/${recruiterID}`)
          .then(result=>{
            setFirstName(result.data.first_name);
            setLastName(result.data.last_name);
            setEmail(result.data.email);

            console.log(result);
          }).catch(err=>{
            console.log(err.response.data.err);
          })
        }
        personnal_info();
      }, [])
      

       // notification success
      const notify = () => {
  toast.success("Information are successfully updated !", {
      position:"top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      theme: "light",
  },{toastId:'successNotif'});
}

      const update_recru = () => {
        axios.patch(`http://localhost:3001/update_recru/${recruiterID}`,
        {first_name:firstName,last_name:lastName,email:email})
        .then(result=>{
          notify();
          setTimeout(() => {
            window.location.reload(false);
          }, 2000)  
        
          console.log(result);
          
         
        }).catch(err=>{
          alert(err.response.data.err)
        })
      }

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


  return (
    <div className='EditAccount'>
     
        <div className="container">
        <SidebarAccount/>

            <div className="main">
            <h1 style={{textAlign:"Left", fontSize:"26px", marginTop:"29px"}}> Edit Profile</h1>
             
              <div className="box-user-fullname">
                <div className="user-logo">
                        <AccountCircleIcon style={{ position:"relative", top:"20%", left:"20%",fontSize:"60px", color:"#c10000", }}  className='admin-info-icon'/>
                </div>
                <div className="full-name">
                  <h3 style={{textTransform:"capitalize", wordSpacing:"11px"}}>{firstName} {lastName} </h3>
                  <p>Edit your profile   Information</p>
                </div>
            </div>
            <div className="box-edit-user">
              <div className="side-box">
                <button className='selected-button' onClick={EditAccountPage}>Edit profile</button>
                <button onClick={EditCompanyPage}>Edit company</button>
                <button onClick={pwdPage} >Password & security</button>
              </div>
              <div className='container-edit-user'>
               <h4 style={{color:"#a1a5ad"}}>Edit Profile</h4>
               <p style={{color:"#a1a5ad", fontSize:"14px", marginBottom:"30px"}}>Personal</p>

              
               <form className='form-edit-user' onSubmit={handleSubmit(update_recru)}>
                  <div className="align-edit-form">
                      <div className="edit-user-field">
                          <div className='edit-user-input'>
                            <div className="icons">
                                <i className="fas fa-user"></i>
                            </div>
                            <label htmlFor="firstName"> First Name</label>
                              <input type="text" defaultValue={firstName}  placeholder='First name' name="firstName"
                              style={{textTransform:"capitalize"}}
                              onChangeCapture={(e)=>{setFirstName(e.target.value)}}  {...register('first_name')} 
                              />
                          </div>
                          <p className='signup-error-message' >{errors.first_name && errors.first_name.message}</p>

                      </div>
                      <div className="edit-user-field">
                          <div className='edit-user-input'>
                            <div className="icons">
                                <i className="fas fa-user"></i>
                            </div>
                            <label htmlFor="lastName"> Last Name</label>
                              <input defaultValue={lastName} onChangeCapture={(e)=>{setLastName(e.target.value)}} type="text"
                              style={{textTransform:"capitalize"}}
                              placeholder='Last name' name="lastName" {...register('last_name')}  />
                          </div>
                             <p className='signup-error-message' >{errors.last_name && errors.last_name.message}</p>


                      </div>
                  </div>
                  <div className="edit-email-field">
                          <div className='edit-email-input'>
                            <div className="icons">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <label htmlFor="email"> Email</label>
                            <input type="email" name="email" placeholder='Email'
                              value={email}
                              {...register('email')} 
                            />
                          </div>
                      </div>


                <button className='edit-user-button'> Save </button>
               </form>


              </div>

            </div>

            </div>

            <ToastContainer/>    
        </div>
        
    </div>
  )
}

export default EditAccount