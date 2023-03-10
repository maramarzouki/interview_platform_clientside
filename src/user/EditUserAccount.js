import React, { useRef, useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import SidebarUser from './sidebar/SidebarUser';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

function EditUserAccount() {
  
  const token = localStorage.getItem('token');
  const t=jwtDecode(token);
  const recruiterID = t._id; 

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("");
  const [sector, setSector] = useState("");

    const {register, handleSubmit, formState : {errors}, watch} = useForm({
        defaultValues:{
          first_name:firstName,
          last_name:lastName,
          email:email,
          password:pwd,
          confirmPassword:'',
          company_name:companyName,
          country:country,
          sector:sector
        }
      })
    
    
    
      const password = useRef({});
      password.current = watch("password", "");
    
      const onSubmit=(data) => {
         /* window.alert("Account is edited");*/
          console.log(data);
      }

      useEffect(() => {
        const personnal_info = () => {
          axios.get(`http://localhost:3001/recru_info/${recruiterID}`).
          then(result=>{
            setFirstName(result.data.first_name);
            console.log(result);
          }).catch(err=>{
            console.log(err.response.data.err);
          })
        }
        personnal_info();
      }, [])
      


      const update_recru = (data) => {
        axios.patch(`http://localhost:3001/update_recru/${recruiterID}`,)
        .then(result=>{
          console.log(data);
          console.log(result);
        }).catch(err=>{
          alert(err.response.data.err)
        })
      }
  return (
    <div className='EditUserAccount'>
         <div className="dash-container">
          <SidebarUser/>

        <div className="edit-account">
              <div className="user-title-container">
                <h1 className='userTitle' style={{marginLeft:"40%"}}> Edit Account</h1>
              </div>

              <div className="user-edit-container">
                <form className="user-edit-form" onSubmit={handleSubmit(update_recru)}>

                <div className="fields-admin-edit">
                    <div className="edit2-input-field">
                        <i className="fas fa-user"></i>
                        <input type="text" placeholder='First name' name="firstName"  {...register('first_name')} />
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
                  <div className="fields-admin-edit">
                    <div className="edit2-input-field">
                        <i className="fas fa-building"></i>
                        <input type="text" placeholder='Company' name="compnay" {...register('company_name')} />
                    </div>
                    <div className="edit2-input-field">
                        <i className="fas fa-building"></i>
                        <input type="text" placeholder='Sector' name="sector" {...register('sector')} />
                    </div>

                </div>

               <input type="submit" value="Edit account" className='button1' style={{marginTop:"0px", marginLeft:"27%"}}/>

                    
                    

                </form>


              </div>




             

          </div> 

          </div>
    </div>
  )
}

export default EditUserAccount