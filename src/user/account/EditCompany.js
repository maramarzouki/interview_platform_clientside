import {React, useState, useEffect} from 'react'
import SidebarAccount from '../../sidebar/SidebarAccount'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../user_style/editinfos.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useForm } from 'react-hook-form';
//notifications with toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditCompany() {

  // useState
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  // const [id, setid] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [country, setCountry] = useState('')
  const [size, setSize] = useState('')
  const [domain, setDomain] = useState('')

  
  const token = localStorage.getItem('token');
  const t=jwtDecode(token);
  const recruiterID = t._id; 

  const {register, handleSubmit, formState : {errors}} = useForm({
    defaultValues:{
      ontouched:{
      companyName:'',
      country:'',
      size:'',
      domain:''
    }}
  })

  
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

  const recruiter_infos = () =>{
    axios.get(`http://localhost:3001/recru_info/${recruiterID}`)
    .then(recruiter => {
      // setid(recruiter.data._id)
      setFirstName(recruiter.data.first_name)
      setLastName(recruiter.data.last_name)
     
    })

  }

  const company_info = () =>{
    axios.get(`http://localhost:3001/get_company_info/${recruiterID}`)
    .then(result=>{
      setCompanyName(result.data.company_name);
      setCountry(result.data.country);
      setDomain(result.data.domain);
      setSize(result.data.size);
    }).catch(err=>{console.log(err);})
  }
  useEffect(() => {
    recruiter_infos();
    company_info();
   },[]) 





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


    const update_company = (data) =>{
      axios.patch(`http://localhost:3001/update_company/${recruiterID}`,
      {company_name:companyName,country:country,domain:domain,size:size})
      .then(()=>{
        notify();
        setTimeout(() => {
          window.location.reload(false);
        }, 2000) 

      }).catch(err=>{
        console.log(err);
      })
    }

  return (
    <div className='EditCompany'>
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
                <button  onClick={EditAccountPage}>Edit profile</button>
                <button  onClick={EditCompanyPage} className='selected-button'>Edit company</button>
                <button onClick={pwdPage}>Password & security</button>
              </div>
              <div className='container-edit-user'>
               <h4 style={{color:"#a1a5ad"}}>Edit Profile</h4>
               <p style={{color:"#a1a5ad", fontSize:"14px", marginBottom:"30px"}}>Company</p>

              
               <form className='form-edit-user' onSubmit={handleSubmit(update_company)}>
                  <div className="align-edit-form">
                      <div className="edit-user-field">
                          <div className='edit-user-input'>
                            <div className="icons">
                                <i className="fas fa-building"></i>
                            </div>
                            <label htmlFor="companyName"> Company Name</label>
                            <input type="text" name="companyName" placeholder='Company Name' 
                              value={companyName}
                              style={{textTransform:"capitalize"}}
                              {...register('companyName')}
                            />
                          </div>
                          <p className='signup-error-message' >{errors.companyName && errors.companyName.message}</p>

                      </div>
                      <div className="edit-user-field">
                          <div className='edit-user-input'>
                            <div className="icons">
                                <i className="fas fa-building"></i>
                            </div>
                            <label htmlFor="domain"> domain</label>
                            <input type="text" name="domain" placeholder='domain' 
                               defaultValue={domain} onChangeCapture={(e)=>{setDomain(e.target.value)}}
                               style={{textTransform:"capitalize"}}
                               {...register('domain')}
                            />
                          </div>
                          <p className='signup-error-message' >{errors.domain && errors.domain.message}</p>


                      </div>
                  </div>
                  <div className="align-edit-form">
                      <div className="edit-user-field">
                          <div className='edit-user-input'>
                            <div className="icons">
                                <i className="fas fa-building"></i>
                            </div>
                            <label htmlFor="size"> Size</label>
                            <input type="text" name="size" placeholder='Size' 
                               defaultValue={size} onChangeCapture={(e)=>{setSize(e.target.value)}}
                               style={{textTransform:"capitalize"}}
                               {...register('size')}
                            />
                          </div>
                          <p className='signup-error-message' >{errors.size && errors.size.message}</p>

                      </div>
                      <div className="edit-user-field">
                          <div className='edit-user-input'>
                            <div className="icons">
                                <i className="fas fa-building"></i>
                            </div>
                            <label htmlFor="country"> Country</label>
                            <input type="text" name="country" placeholder='Country' 
                               defaultValue={country} onChangeCapture={(e)=>{setCountry(e.target.value)}}
                               style={{textTransform:"capitalize"}}
                               {...register('country')}
                            />
                          </div>
                          <p className='signup-error-message' >{errors.country && errors.country.message}</p>

                      </div>
                  </div>


                <button className='edit-user-button' style={{marginTop:"5px"}}> Save </button>
               </form>


              </div>

            </div>


            </div>
            <ToastContainer/> 
        </div>
    </div>
  )
}

export default EditCompany