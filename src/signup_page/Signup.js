import React, { useRef, useState} from 'react';
import './signup.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
//notifications with notify

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
     // checking agree to terms
    const[isChecked, setIsChecked] = useState(false);
   

    const {register, handleSubmit, formState : {errors}, watch} = useForm({
        defaultValues:{
            first_name:'',
            last_name:'',
            email:'',
            password:'',
            confirmPassword:'',
            company_name:'',
            domain:'',
            size:'',
            country:''

        }
    })

    const password = useRef({});
    password.current = watch("password", "");

       // notifications
// notification success
const notify = () => {
    toast.success("  We sent a verification mail to your email, check to login!", {
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

    // notification warning
    const notifyWarning = () =>{
        toast.warning("Please agree to the terms and conditions !", {
            position:"top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "light",
        },{toastId:'warningNotif'});
    }



     const checkAgree = () => {
         setIsChecked(true);
     }

  const add_recruiter = (data) => {
        if (isChecked){
        const {first_name,last_name,email,password,company_name,country,domain,size} = data
        axios.post(`http://localhost:3001/add_recru`,{first_name,last_name,email,password,company_name,country,domain,size})
        .then(result=>{
            console.log(result);
            notify();
        }).catch(err=>{
            console.log(err.response.data.err);
            notifyError(err.response.data.err);

        })
    }else{
        notifyWarning();
      }
}

  return (
    <div className='signup'>
        <div className="form-box-container">
            <div className="header-logo">
                    <img src="images/logo2.png" alt="logo" width={"105px"} />   
                    <h3 className='logo-title-signup'>Interviews<i className="fas fa-video" style={{marginLeft:"10px"}}></i> </h3> 
            </div> 
                <h2 className='signup-title'>Sign Up</h2>



            <div className="signup-form">
                <form onSubmit={handleSubmit(add_recruiter)}>
                        {/* for both fields */}
                <div className="fields">
                    {/* one input */}
                    <div className="signup-field-container">
                        <div className="signup-input">
                            <div className="icons">
                                <i className="fas fa-user"></i>
                            </div>
                        <input type="text" name="first_name" placeholder='First Name' style={{textTransform:"capitalize"}}
                        {...register("first_name", {required:"First name is  required"})}
                        />

                        </div>
                             <p className='signup-error-message' >{errors.first_name && errors.first_name.message}</p>


                    </div>
                    {/* one input */}
                    <div className="signup-field-container">
                        <div className="signup-input">
                            <div className="icons">
                                <i className="fas fa-user"></i>
                            </div>
                        <input type="text" name="last_name" placeholder='Last Name' style={{textTransform:"capitalize"}}
                             {...register("last_name", {required:"Last name is required"})}
                        />
                        </div>
                        <p className='signup-error-message' >{errors.last_name && errors.last_name.message}</p>

                    </div>

                </div>

                    {/* only one field for email */}

                    <div className="signupOne-field-container">
                         <div className='signup-input'>
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
                        <p className='signup-error-message' >{errors.email && errors.email.message}</p>

                     </div> 

                      {/* 2 fields of passwords */}
                <div className="fields">
                    {/* one input */}
                    <div className="signup-field-container">
                        <div className="signup-input">
                            <div className="icons">
                                <i className="fas fa-lock"></i>
                            </div>
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

                        </div>
                        <p className='signup-error-message' >{errors.password && errors.password.message}</p>


                    </div>
                    {/* one input */}
                    <div className="signup-field-container">
                        <div className="signup-input">
                            <div className="icons">
                                <i className="fas fa-lock"></i>
                            </div>
                        <input type="password" name="confirmPassword" placeholder='Confirm Password' 
                        {...register("confirmPassword",
                        {required:"",
                        validate: value => value === password.current || "not matched"

                        })}
                           
                        />

                        </div>
                        <p className='signup-error-message' >{errors.confirmPassword && errors.confirmPassword.message}</p>


                    </div>
                </div>

                {/* company fields */}
                <div className="fields">
                    {/* one input */}
                    <div className="signup-field-container">
                        <div className="signup-input">
                            <div className="icons">
                                <i className="fas fa-building"></i>
                            </div>
                        <input type="text" name="company_name" placeholder='Company name' style={{textTransform:"capitalize"}}
                            {...register("company_name", {required:"Company name is  required"})}  
                        />

                        </div>
                        <p className='signup-error-message' >{errors.company_name && errors.company_name.message}</p>


                    </div>
                    {/* one input */}
                    <div className="signup-field-container">
                        <div className="signup-input">
                            <div className="icons">
                                <i className="fas fa-building"></i>
                            </div>
                        <input type="text" name="domain" placeholder='domain' style={{textTransform:"capitalize"}}
                            {...register("domain", {required:"domain is required"})}
                        />

                        </div>
                        <p className='signup-error-message' >{errors.domain && errors.domain.message}</p>


                    </div>
                </div>

                {/* country and size */}
                <div className="fields">
                    {/* one input */}
                    <div className="signup-field-container">
                        <div className="signup-input">
                            <div className="icons">
                                <i className="fas fa-building"></i>
                            </div>
                        <input type="text" name="size" placeholder='Company size'
                            {...register("size", {required:"Size is  required"})}
                        />

                        </div>
                        <p className='signup-error-message' >{errors.size && errors.size.message}</p>


                    </div>
                    {/* one input */}
                    <div className="signup-field-container">
                        <div className="signup-input">
                            <div className="icons">
                                <i className="fas fa-flag"></i>
                            </div>
                        <input type="text" name="country" placeholder='Country' style={{textTransform:"capitalize"}}
                            {...register("country", {required:"country is required"})}
                        />

                        </div>
                        <p className='signup-error-message' >{errors.country && errors.country.message}</p>



                    </div>
                </div>
                {/* accepting to terms checkbox */}
                <div className="check-wrapper"> 
                     <input type="checkbox" name="accept" id='checkOne' onChange={checkAgree} />
                      <label htmlFor="checkOne"  style={{fontSize:"13px", textAlign:"center"}}>I agree to terms and conditions</label>
                </div>


                        <button className='button-signup'>Sign up</button>

                        <p style={{ textAlign:"center", fontSize:'13px', marginTop:"15px"}}>Already have an account ? <Link to={"/"} style={{color:"#B00204", marginLeft:"5px"}}> Login</Link></p>



                </form>
            </div>
            <ToastContainer />
        </div>




         {/* picture here */}
         <div className="pic-login-container">
            <div className="box-pic">
            <img src="images/person.png" alt="person" width={'400px'} height={'630px'} style={{marginLeft:'120px', marginTop:'-10px'}} />

                
            </div>
        </div>

    </div>
  )
}

export default Signup