import React, { useRef } from 'react'
import './dash.css';
import SidebarAccount from './sidebar/SidebarAccount';
import { useForm } from 'react-hook-form';
import axios from 'axios';


function EditAccount() {

  /* validation of some infos*/

  const {register, handleSubmit, formState : {errors}, watch} = useForm({
    defaultValues:{
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      confirmPassword:'',
      phone_number:'',
      address:'',
    }
  })



  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit=(data) => {
     /* window.alert("Account is edited");*/
      console.log(data);
  }

  const update_admin = async (data) => {
    const token = localStorage.getItem('token');
    const adminID = token._id;
    const {first_name,last_name,email,password,confirmPassword,phone_number,address} = data
    await axios.patch(`http://localhost:3001/update_info/${adminID}`,{
      first_name,
      last_name,
      email,
      password,
      phone_number,
      address
    }).
    then(result=>{
      console.log(result);
    }).catch(err=>{
      alert(err.response.data.err)
    })
  }




  return (
    <div>
      <div className="dash-container">
          <SidebarAccount/>


          {/* edit form  account */ }
        <div className="edit-account">
              <div className="admin-title-container">
                <h1 className='adminTitle' style={{marginLeft:"40%"}}> Edit Account</h1>
              </div>

              <div className="admin-edit-container">
                <form className="admin-edit-form" onSubmit={handleSubmit(update_admin)}>

                <div className="fields-admin-edit">
                    <div className="edit2-input-field">
                        <i className="fas fa-user"></i>
                        <input type="text" placeholder='First name' name="firstName" {...register('first_name')}  />
                    </div>
                    <div className="edit2-input-field">
                        <i className="fas fa-user"></i>
                        <input type="text" placeholder='Last name' name="lastName" {...register('last_name')} />
                    </div>

                </div> 
                  <div className="edit-input-field">
                          <i className="fas fa-envelope"></i>
                          <input type="email" placeholder='email' name='email'
                            {...register("email", {
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message:"Please enter a valid email!"
                          }

                          })}/>
                         <p className='edit-error-message' style={{fontSize:"11px"}}>{errors.email && errors.email.message}</p>

                          
                  </div>  
                  <div className="edit-input-field">
                          <i className="fas fa-phone"></i>
                          <input type="number" placeholder='phone number' name='phoneNumber' {...register('phone_number')} />
                  </div> 
                  <div className="edit-input-field">
                          <i className="fas fa-building"></i>
                          <input type="text" placeholder='Adress' name='adress' {...register('address')} />
                  </div> 
                  <div className="edit-input-field">
                          <i className="fas fa-lock"></i>
                          <input type="password" placeholder='Password' name='password'
                            {...register("password",
                            {
                            minLength:{value:8, message:"Password must have at least 8 characters"},
                            maxLength:{value:25, message:"Password can not be more than 25 characters"},
                            pattern: {
                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ ,                                       
                                message:"Should have number, lowercase and uppercase letter"
                            }

                            })}
                          />
                                    <p className='edit-error-message' style={{fontSize:"11px"}}>{errors.password && errors.password.message}</p>



                  </div> 
                  <div className="edit-input-field">
                          <i className="fas fa-lock"></i>
                          <input type="password" placeholder='Confirm Password' name='confirmPassword'
                            {...register("confirmPassword",
                            {required:"",
                            validate: value => value === password.current || "not matched"

                            })}
                          />
                         <p className='edit-error-message' style={{fontSize:"11px"}}  >{errors.confirmPassword && errors.confirmPassword.message}</p>

                  </div> 

               <input type="submit" value="Edit account" className='button1' style={{marginTop:"0px", marginLeft:"27%"}}/>

                    
                    

                </form>


              </div>




             

          </div> 
      </div>
    </div>
  )
}

export default EditAccount