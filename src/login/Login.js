import React from 'react'
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

//notifications with toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Login() {

    /*control infos in login form */


    const{register, handleSubmit, formState : {errors}} = useForm({
        defaultValues:{
            email:'',
            password:''
        }
    })
    const navigate = useNavigate();


   

    // notification success
    const notify = () => {
        toast.success("You successfully logged in !", {
            position:"top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "light",
        },{toastId:'successNotif'});
    }


    // notification failure
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


    const login_recru = (data) =>{
        const {email,password} = data
        axios.post(`http://localhost:3001/recru_login`,{
            email,
            password
        }).then(result=>{
            console.log(result);
            localStorage.setItem('token',result.data.token);
            notify();
            //delay time to navigate to another page
            setTimeout(() => {
                navigate('/userdash')
              }, 2000)  
            
        }).catch(err=>{
            console.log(err);
            notifyError(err.response.data.err);
        })
    }


  return (
    <div className='login'>
        <div className='form-container'>
            <div className="signin">



                <form  className="login-form" onSubmit={handleSubmit(login_recru)}>
                    <h1 className='login-title'>Login</h1>

                    <div className="login-input-field">
                        <i className="fas fa-user"></i>

                        <input type="mail"
                               placeholder='Email adress'
                               name="email"

                            {...register("email", {required:" Email is required",
                                 pattern: {
                                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                   message:"Please enter a valid email!"
                                 }
       
                                 })}
                        />

                        <p className='signup-error-message' >{errors.email && errors.email.message}</p>


                    </div>

                    <div className="login-input-field">
                        <i className="fas fa-lock"></i>

                        <input type="password" 
                               placeholder='Password' 
                               name="password"  
                               {...register("password",
                                     {required:"Password is required",
                                      minLength:{value:8, message:"Password must have at least 8 characters"}
                                     })}
                               />

                        <p className='signup-error-message' >{errors.password && errors.password.message}</p>
                        <p className='forgot-pwd' style={{marginLeft:"43%", fontSize:"13px", color:"rgb(146, 144, 144)"}}>Forgot password ?</p>

                   </div>
                    <input type="submit" value="Login" className='button' />
                   
    
                </form>
                <p style={{textAlign:"center"}}>Doesn't have an account yet? <Link to={"/signupform"} style={{color:"#B00204"}}> Sign up</Link></p>
                

            </div>
            <ToastContainer />


        </div>
        <div className="panel">
            <div className="left-panel">
            <img src="images/logo.png" className='logo' alt="" />

                <div className="left-content">
                    <h3> Interviews <i className="fas fa-video"></i> </h3>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Login