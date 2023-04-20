import React from 'react'
import './forgotpwd.css';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import { useForm } from 'react-hook-form';
import axios from 'axios';

//notifications with notify

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
    const{register, handleSubmit, formState : {errors}} = useForm({
        defaultValues:{
            email:''
        }
      })

// notification success
const notify = () => {
    toast.success(" Check your email for reset password link !", {
        position:"top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
    },{toastId:'successNotif'});
}

// notification error
const notifyError = (notif) =>{
        
    toast.error(notif, {
        position:"top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
    },{toastId: 'errorNotif'});
}

const verify_email = (email) =>{
    // const {email}=data
    axios.post('http://localhost:3001/forgot-password',email)
    .then(
        notify()).catch(err=>{
        notifyError(err.response.data.err);
    })
    console.log(email);
}
  return (
    <div className='container-fg-pwd'>
        <ToastContainer/>
        <div className="form-fg">
            <div className="fg-content">
                
                 <div className="fg-icon">
                    <MarkEmailUnreadIcon style={{fontSize:"37px", color:"#C10000"}}/>
                </div>
                 <div className="fg-title">
                    <h1>Forgot Your Password ? </h1>
                </div>

                <div className="fg-instruction">
                    Enter your email address to recieve <br /> a link 
                    that allows you to create a new password.
                </div>
                <form onSubmit={handleSubmit(verify_email)}>
                    <div className="fg-input">
                        <input type="email" name="email" placeholder='Email' {...register("email", {required:" Email is required",
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                  message:"Please enter a valid email!"
                                }
                              })} />
                                  <p className='error-message-fg' >{errors.email && errors.email.message}</p>
      
                    </div>
                    <div className="fg-button">
                        <button>Send</button>
                    </div>
                </form>
            </div>
        </div>
        
        
    </div>
  )
}

export default ForgotPassword