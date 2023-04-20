import React, { useRef } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './forgotpwd.css';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';


//notifications with toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewPassword() {
    const {register, handleSubmit, formState : {errors}, watch} = useForm({
        defaultValues:{
            password:'',
            confirmPassword:''
        }
      })

      const navigate = useNavigate();
      const password = useRef({});
    password.current = watch("password", "");

             const {userID} = useParams();
             // notification success
            const notify = () => {
                toast.success("Password is successfully updated !", {
                    position:"top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                    theme: "light",
                },{toastId:'successNotif'});
            }

    const update_password = (password) =>{
        axios.post(`http://localhost:3001/resetpassword/${userID}`,password)
        .then(result=>{
            notify();
             //delay time to navigate to another page
                setTimeout(() => {
                    navigate('/account');
                }, 2500)  
            

            // alert("success")

            console.log(result);
        }).catch(err=>{
            alert("err")
            console.log(err.response);
        })
    }
  return (
    <div className='container-fg-pwd'>
        <div className="form-fg">
            <div className="fg-content">
                
                 <div className="fg-icon">
                    <LockOutlinedIcon style={{fontSize:"37px", color:"#C10000"}}/>
                </div>
                 <div className="fg-title">
                    <h1>Reset Password  </h1>
                </div>

                <div className="fg-instruction">
                    Enter your new password below
                </div>
                <form onSubmit={handleSubmit(update_password)}>
                    <div className="fg-input">
                        <input type="password" name="password" placeholder='Password' 
                            
                            {...register("password",
                            {required:"Password is required",
                            minLength:{value:8, message:"Password must have at least 8 characters"},
                            maxLength:{value:25, message:"Password can not be more than 25 characters"},
                            pattern: {
                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/                                        ,
                                message:"Should have number, lowercase and uppercase letter"
                            }
    
                            })}
                        />
                            <p className='error-message-fg' >{errors.password && errors.password.message}</p>

                    </div>
                    <div className="fg-input">
                        <input type="password" name="confirmPassword" placeholder='Confirm password' 
                             {...register("confirmPassword",
                             {required:"",
                             validate: value => value === password.current || "not matched"
     
                             })}
                        />
                    </div>
                    <div className="fg-button">
                        <button>Reset </button>
                    </div>
                </form>
            </div>
        </div>
        <ToastContainer/>


    </div>
  )
}

export default NewPassword