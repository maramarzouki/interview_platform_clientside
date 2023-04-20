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
        
        <div className="form-box-container">
            <div className="header-logo">
                <img src="images/logo2.png" alt="logo" width={"120px"} />   
                <h3>Interviews<i className="fas fa-video" style={{marginLeft:"15px"}}></i> </h3> 
            </div> 
            <h2 style={{textAlign:"center"}}>Sign In</h2>
            <div className="form-login">   


                <form onSubmit={handleSubmit(login_recru)} >
                            {/* one input */}
                <div className="signin-field">
                    <div className='signin-input'>
                      <div className="icons">
                      <i className="fas fa-envelope"></i>
                      </div>
                      <input type="email" placeholder='Email' name='email'
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

                {/* one input */}
                <div className="signin-field">
                    <div className='signin-input'>
                      <div className="icons">
                      <i className="fas fa-lock"></i>
                      </div>
                      <input type="password" placeholder='Password' name='password'
                         {...register("password",
                                   {required:"Password is required"
                                   })}
                             
                      />

                    </div>
                    <p className='signin-error-message' >{errors.password && errors.password.message}</p>

                    <p className='forgot-pwd'> <Link to={'/forgotpassword'} style={{textDecoration:"none", color:"rgb(146, 144, 144)"}}> Forgot password ?</Link>  </p> 

                </div> 

                    <div className="signin-field">
                        <button className='button-login'>Login</button>

                    </div>
                    <p style={{ textAlign:"center", fontSize:'14px', marginTop:"25px"}}>Doesn't have an account yet?<Link to={"/signup"} style={{color:"#B00204", marginLeft:"5px"}}> Signup</Link> </p>

                </form>

            </div> 
            
        </div>
        <ToastContainer/> 




    {/* picture here */}

        <div className="pic-login-container">
            <div className="box-pic">
                <img src="images/person.png" alt="person" width={'400px'} height={'630px'} style={{marginLeft:'120px', marginTop:'-10px'}} />
            </div>
        </div>
        

    </div>
  )
}

export default Login