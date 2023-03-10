import React, { useRef, useState } from 'react'
import './signup.css'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios'
//notifications with notify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignupForm() {

    /*control infos in form*/ 

    const {register, handleSubmit, formState : {errors}, watch} = useForm({
        defaultValues:{
            first_name:'',
            last_name:'',
            email:'',
            password:'',
            confirmPassword:'',
            company_name:'',
            sector:'',
            size:'',
            country:''

        }
    })

    const password = useRef({});
    password.current = watch("password", "");

    // notifications
// notification success
const notify = () => {
    toast.success(" Your account has been successfully created!", {
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



    // checking agree to terms
    const[isChecked, setIsChecked] = useState(false);

    const checkAgree = () => {
        setIsChecked(true);
    }
    
    const add_recruiter = (data) => {
        if (isChecked){
        const {first_name,last_name,email,password,confirmPassword,company_name,sector,size,country} = data
        axios.post(`http://localhost:3001/add_recru`,{
            first_name,
            last_name,
            email,
            password,
            company_name,
            country,
            size,
            sector
        })
        .then(result=>{
            console.log(result);
            notify();
        }).catch(err=>{
            console.log(data);
            notifyError(err.response.data.err);

        })
    }else{
        notifyWarning();
      }
}


  return (
    <div className='signup'>
        <div className='form-container'>
            <div className="signup_container">
                <form  className="signup-form" onSubmit={handleSubmit(add_recruiter)}>
                    <h1 className='signup-title'>Sign up</h1>


                <div className="fields">
                    <div className="signup2-input-field">
                        <i className="fas fa-user"></i>
                        <input type="text" placeholder='First name' name="first_name" {...register("first_name", {required:"First name is  required"})}  />
                            <p className='signup-error-message'  >{errors.first_name && errors.first_name.message}</p>
                    </div>
                    <div className="signup2-input-field">
                        <i className="fas fa-user"></i>
                        <input type="text" placeholder='Last name' name="last_name" {...register("last_name", {required:"Last name is required"})} />
                            <p  className='signup-error-message' >{errors.last_name && errors.last_name.message}</p>
                    </div>

                </div>

                 <div className="signupf-input-field">
                        <i className="fas fa-envelope"></i>
                        <input type="mail" placeholder='Email adress' name="email"
                          {...register("email", {required:" Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message:"Please enter a valid email!"
                          }

                          })}/>
                             <p className='signup-error-message' >{errors.email && errors.email.message}</p>

                    </div>   

                    <div className="fields">
                                <div className="signup2-input-field">
                                    <i className="fas fa-lock"></i>
                                    <input type="password" placeholder='Password' name="password"
                                    {...register("password",
                                                {required:"Password is required",
                                                minLength:{value:8, message:"Password must have at least 8 characters"},
                                                maxLength:{value:25, message:"Password can not be more than 25 characters"},
                                                pattern: {
                                                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/                                        ,
                                                    message:"Should have number, lowercase and uppercase letter"
                                                }

                                                })} />
                                        <p className='signup-error-message' style={{fontSize:"11px"}}>{errors.password && errors.password.message}</p>
                                </div>
                                <div className="signup2-input-field">
                                    <i className="fas fa-lock"></i>
                                    <input type="password" placeholder='Confirm Password' name="confirmPassword"
                                    {...register("confirmPassword",
                                                {required:"",
                                                validate: value => value === password.current || "not matched"
            
                                                })} />
                                        <p className='signup-error-message' style={{marginLeft:"10%"}} >{errors.confirmPassword && errors.confirmPassword.message}</p>
                                </div>
                    </div>

                    <div className="fields">
                    <div className="signup2-input-field">
                        <i className="fas fa-building"></i>
                        <input type="text" placeholder='Company name' name="company_name" {...register("company_name", {required:"Company name is  required"})}  />
                            <p className='signup-error-message'  >{errors.company_name && errors.company_name.message}</p>
                    </div>
                    <div className="signup2-input-field">
                        <i className="fas fa-building"></i>
                        <input type="text" placeholder='Sector' name="sector" {...register("sector", {required:"sector is required"})} />
                            <p  className='signup-error-message' >{errors.sector && errors.sector.message}</p>
                    </div>

                </div>
                <div className="fields">
                    <div className="signup2-input-field">
                        <i className="fas fa-building"></i>
                        <select placeholder='Company size' name="size" className='select-options' {...register("size", {required:"Size is  required"})}>
                              <option value="" disabled selected style={{color:"#8e8383"}}>Company size</option>

                            <option value="small">Small (10 to 49 employees)   </option>
                            <option value="medium">Medium (50 to 249) </option>
                            <option value="large">Large (more than 250)  </option>
                   
                        </select>
                        <p className='signup-error-message'  >{errors.size && errors.size.message}</p>

                    </div>
                    <div className="signup2-input-field">
                        <i className="fas fa-flag"></i>
                        <input type="text" placeholder='country' name="country" {...register("country", {required:"country is required"})} />
                            <p  className='signup-error-message' >{errors.country && errors.country.message}</p>
                    </div>

                </div>
                    
                
            <div className="check-wrapper"> 
                 <input type="checkbox" name="accept" id='checkOne' onChange={checkAgree}/>
                 <label htmlFor="checkOne" style={{marginLeft:"5px"}}>I agree to terms and conditions</label>
            </div>

                    <input type="submit" value="Sign up" className='button' />
    
                </form>
                <p style={{textAlign:"center"}}>Already have an account ? <Link to={"/"} style={{color:"#B00204"}}> Login</Link> </p>
               
            </div>
            <ToastContainer />
        </div>




      <div className="signup-panel">
            <div className="signup-left-panel">
            <img src="images/logo.png" className='signup-logo' alt="" />

                <div className="signup-left-content">
                    <h3> Interviews <i className="fas fa-video"></i> </h3>
                </div>
            </div>

  </div> 
    </div>
  )
}

export default SignupForm