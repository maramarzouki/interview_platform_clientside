import React from 'react'
//dialogue mui
import {Dialog} from '@mui/material';
import {DialogTitle} from '@mui/material';
import {DialogContent} from '@mui/material';

//control form
import { useForm } from 'react-hook-form';
//style
import './style/dialogCreate.css';


function CreateInterview({open, handleClose}) {

  //controling form with useForm
  const{register, handleSubmit, formState : {errors}} = useForm({
    defaultValues:{
      title:'',
      candidateEmail:'',
      date:'',
      startTime:'',
      endTime:'',
      test:'',

    }
  })


  //a test function 
  const success = () =>{
    alert('success !');
    
    
  }

  //function to add an interview
  // const add_interview = (data) =>{
  //   const {title, candidateEmail, date, startTime, endTime, test} = data;
  //   axios.post(`http://localhost:3001/add_interview`, {title, candidateEmail, date, startTime, endTime, test})
  // }
  

    
  return (
    <div className='CreateInterview'>
            {/* dialog   */}
       <Dialog  open={open} onClose={handleClose}  className='dialog' PaperProps={{ sx: { width: "40%", height: "82%" } }}
>
          <DialogTitle className='dialog-title'>Create Interview</DialogTitle>
          <DialogContent className='dialog-content'>

            {/* Form */}
             <form onSubmit={handleSubmit(success)}>  
                <div className="dialog-field">
                      <label>Interview title</label>
                      <input type="text"  placeholder='Enter Interview Title' name='title' 
                        {...register("title", {required:"Title is required"} )}
                      />
                      <p className='errors-dialog'>{errors.title && errors.title.message}</p>

                </div>

                <div className="dialog-field">
                      <label>Candidate email</label>
                      <input type="email" placeholder='Enter candidate email' name='candidateEmail'
                        {...register("candidateEmail", {required:" Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message:"Please enter a valid email!"
                        }

                        })}
                      />
                      <p className='errors-dialog' >{errors.candidateEmail && errors.candidateEmail.message}</p>

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
                          <input type="time"  name='startTime'
                            {...register("startTime", {required:"Start time is required"})}
                          />
                        <p className='errors-dialog' >{errors.startTime && errors.startTime.message}</p>

                      </div>

                      <div className="dialog-time-to">
                        <input type="time"  name='endTime' 
                        {...register("endTime", {required:"End time is required"})}

                        /> 
                      <p className='errors-dialog' >{errors.endTime && errors.endTime.message}</p>

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
             
        </Dialog>

    </div>
  )
}

export default CreateInterview