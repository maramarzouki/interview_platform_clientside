import React from 'react'
import axios from 'axios';
//dialogue mui
import {Dialog} from '@mui/material';
import {DialogTitle} from '@mui/material';
import {DialogContent} from '@mui/material';

//control form
import { useForm } from 'react-hook-form';
//style
import './style/dialogCreate.css';
import jwtDecode from 'jwt-decode';
// import dayjs from 'dayjs';
//notifications with notify

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CreateInterview({open, handleClose}) {

    const token = localStorage.getItem('token');
    const xtoken = jwtDecode(token);
    const recruiter = xtoken._id;

  //controling form with useForm
  const{register, handleSubmit, formState : {errors}} = useForm({
    defaultValues:{
      title:'',
      candidate_email:'',
      date:'',
      start_hour:'',
      end_hour:'',
      test:'',

    }
  })


// notification success
const notify = () => {
  toast.success("New Interview is added! ", {
      position:"top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      theme: "light",
  },{toastId:'successNotif'});
}

  //function to add an interview
  const add_interview = (data) =>{
    const {title, candidate_email, date, start_hour, end_hour} = data;
    axios.post(`http://localhost:3001/add_interview`, {title, candidate_email, date, start_hour, end_hour, recruiter})
    .then(result =>{
      console.log(result);
      notify();
      setTimeout(() => {
          window.location.reload(true);

      }, 1500) 
    }).catch(err =>{
      console.log(err.response.data);
      
    })
  }
  

    
  return (
    <div className='CreateInterview'>
            {/* dialog   */}
       <Dialog  open={open} onClose={handleClose}  className='dialog' PaperProps={{ sx: { width: "40%", height: "82%" } }}
>
          <DialogTitle className='dialog-title'>Create Interview</DialogTitle>
          <DialogContent className='dialog-content'>

            {/* Form */}
             <form onSubmit={handleSubmit(add_interview)}>  
                <div className="dialog-field">
                      <label>Interview title</label>
                      <input type="text"  placeholder='Enter Interview Title' name='title' 
                        {...register("title", {required:"Title is required"} )}
                      />
                      <p className='errors-dialog'>{errors.title && errors.title.message}</p>

                </div>

                <div className="dialog-field">
                      <label>Candidate email</label>
                      <input type="email" placeholder='Enter candidate email' name='candidate_email'
                        {...register("candidate_email", {required:" Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message:"Please enter a valid email!"
                        }

                        })}
                      />
                      <p className='errors-dialog' >{errors.candidate_email && errors.candidate_email.message}</p>

                </div>

                <div className="dialog-field">
                      <label>Interview Date</label>
                      <input type="date"  name='date' 
                        {...register("date", {required:"Date is required"})}
                      />
                    <p className='errors-dialog' >{errors.date && errors.date.message}</p>

                </div>


                <div className="dialog-field-align">
                    <label>Interview Time</label>

                    <div className="dialog-field-time">
                      <div className="dialog-time">
                          <input type="time"  name='start_hour'
                            {...register("start_hour", {required:"Start time is required"})}
                          />
                        <p className='errors-dialog' >{errors.start_hour && errors.start_hour.message}</p>

                      </div>

                      <div className="dialog-time-to">
                        <input type="time"  name='end_hour' 
                        {...register("end_hour", {required:"End time is required"})}

                        /> 
                      <p className='errors-dialog' >{errors.end_hour && errors.end_hour.message}</p>

                      </div>

                      
                    </div>
                </div>

                <div className="dialog-field" >
                    <label htmlFor="test">Choose a test</label>
                    <select className="select-test" name="test" {...register("test", {required:"Test is required"})} >
                      <option value="test1">test1</option>
                      <option value="test2">test2</option>
                      <option value="test3">test3</option>
                      <option value="test4">test4</option>
                      
                    </select>
                    <p className='errors-dialog' >{errors.test && errors.test.message}</p>

                </div>

                {/* buttons */}
                <div className="dialog-buttons">
                    <button onClick={handleClose} className='dialog-cancel'>Cancel</button>
                    <button  className='dialog-save'>Create Interview</button>
                </div>
             </form>
          
              
          </DialogContent>
          <ToastContainer/>
        </Dialog>
       

    </div>
  )
}

export default CreateInterview