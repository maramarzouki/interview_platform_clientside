import React from 'react'
import './loginform.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

//notifications with toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 function LoginForm() {
     
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
    <div className='loginform'>
        <div className="login-form-container">
            <div className="form-logo" style={{marginTop:"15px", marginLeft:"-230px"}}>
                <img src="images/logo2.png"  alt="" width={"120px"}  style={{marginTop:"25px", marginLeft:"280px"}}/>
              <h3> Interviews <i className="fas fa-video"></i> </h3> 
            </div>



            <div className="signin-form">
              <h2>Sign in</h2>
              <form onSubmit={handleSubmit(login_recru)}>

                      {/* one input */}
                <div className="signin-field">
                    <div className='signin-input'>
                      <div className="icons">
                      <i className="fas fa-envelope"></i>
                      </div>

                    <input type="email"
                      name="email" 
                      placeholder='Email' 
                          {...register("email", {required:" Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message:"Please enter a valid email!"
                          }

                          })}
                      />

                    </div>
                    <p className='signin-error-message' >{errors.email && errors.email.message}</p>

                </div> 





            <div className="signin-field">
                <div className='signin-input'>
                  <div className="icons">
                    <i className="fas fa-lock"></i>
                    </div>
                    <input type="password" 
                          name="password"
                           placeholder='Password'
                           {...register("password",
                                     {required:"Password is required"
                                     })}
                               />

                           
                           
                </div>
                <p className='signin-error-message' >{errors.password && errors.password.message}</p>

                <p className='forgot-pwd' style={{ marginTop:"2px",marginLeft:"61%", fontSize:"12px", color:"rgb(146, 144, 144)"}}>Forgot password ?</p> 
          </div>


                <button className='button-login'>Login</button>

              </form>
              <p style={{ textAlign:"center", fontSize:'14px', marginTop:"25px"}}>Doesn't have an account yet? <Link to={"/signup"} style={{color:"#B00204"}}> Sign up</Link></p>

            </div>

        </div>
        <ToastContainer/>
        <div className="login-pic-container">
          <div className="pic-container">

          </div>

        </div>

    </div>
  )
}
export default LoginForm
