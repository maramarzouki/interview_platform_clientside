import React, { useState, useEffect } from 'react'
import SidebarInterview from '../sidebar/SidebarInterview'
import './style/interview.css';

//table from mui
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

//dialogue mui
import {Dialog} from '@mui/material';
import {DialogTitle} from '@mui/material';
import {DialogContent} from '@mui/material';

import {  Modal } from 'antd';
import { useForm } from 'react-hook-form';
import moment from 'moment';


//icons
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CreateInterview from './CreateInterview';
import LinkIcon from '@mui/icons-material/Link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

// notifications with toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import dayjs from 'dayjs';
//styling table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.common.black,
      
   
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.white,
      
    },

  }));


function Interviews() {

  // notifications with notify

    const notify_edit = () => {
        toast.success(" Interview successfully updated !", {
            position:"top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "light",
        },{toastId:'successNotif'});
    }

    const [interviews , setInterviews] = useState([]);
    //controling form
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



    //token and recruiter ID
    const token = localStorage.getItem('token');
    const xtoken = jwtDecode(token);
    const recruiterID = xtoken._id;

    const show_interviews = () =>{

      axios.get(`http://localhost:3001/get_interviews/${recruiterID}`)
      .then(result =>{
        setInterviews(result.data);

      }).catch(err =>{
        console.log(err.response.data);
      })
    }

    useEffect(() => {
      show_interviews();
      }, [])
    

    //! opening and closing the create interview dialog
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () =>{
      setOpenDialog(true);
    }
    const handleCloseDialog = () =>{
      setOpenDialog(false);
      window.location.reload(true);

    }

// 
    //! opening and closing show details dialog
    const [openDetails, setOpenDetails] = useState(false);
    const [title, setTitle] = useState('');
    const [candidate_email, setCandidateEmail] = useState('');
    const [date, setdate] = useState('');
    const [start_hour, setStartHour] = useState('');  
    const [end_hour, setEndHour] = useState('');
    const [link, setLink] = useState('');  
    const [interviewID,setInterviewID] = useState('');

    const handleShowDetails = () => {
      setOpenDetails(true);
    }

    const showDetails = (id) =>{
      handleShowDetails();
      get_interview_details(id);
    }
    
    const closeShowDetails = () => {
      setOpenDetails(false);
      window.location.reload(false);

    }

    const get_interview_details = (interviewID) => {
      axios.get(`http://localhost:3001/get_interview_details/${interviewID}`)
      .then(details=>{
        console.log(details);
        setTitle(details.data.title);
        setCandidateEmail(details.data.candidate_email);
        setdate(moment(details.data.date, 'DD/MM/YYYY').format('YYYY-MM-DD'));

        // setdate(dayjs(details.data.date).format('YYYY-MM-DD'));
        // setdate(details.data.date);
        // setdate(dayjs(details.data.date, 'DD/MM/YYYY').format('YYYY-MM-DD'));
        setStartHour(details.data.start_hour);
        setEndHour(details.data.end_hour);
        setLink(details.data.link);
        // console.log(dayjs(details.data.date).format('YYYY-MM-DD'));
      }).catch(err=>{
        console.log(err.response.data);
      })
    }

    // notify candidate 
    const notify_candidate = () =>{
      const interview_date = moment(date).format("DD/MM/YYYY");
      axios.post(`http://localhost:3001/notify_candidate/${recruiterID}`,{
        candidate_email,date:interview_date,start_hour,link
      })
    }
 
    

    //! opening and closing edit interview dialog
    const [openEdit, setOpenEdit] = useState(false);
    const handleEditDialog = (interviewID) =>{
      setOpenEdit(true);
      get_interview_details(interviewID);
    }
    const closeEditDialog = () =>{
      setOpenEdit(false);
      window.location.reload(false);



    }

    const update_interview = () => {
      // const newInterviewDate = dayjs(date).format("yyyy-MM-dd");

      axios.patch(`http://localhost:3001/update_interview/${interviewID}`,
      {title:title,candidate_email:candidate_email,date:date,start_hour:start_hour, end_hour:end_hour})
      .then(result=>{
        console.log(result);
        notify_edit();
        setTimeout(() => {
          window.location.reload(false);
        }, 1000)  
      
        
       
      }).catch(err=>{ 
        console.log(err.response.data.err);
      })
    }

    // const updating_stuff = (interviewID) =>{
    //   setInterviewID(interviewID);
    //   handleEditDialog();
    // } 
   

    // ! deleting interview

      const deleteing_Interview = (interviewID) =>{
        Modal.confirm({
          title:'Delete Interview',
          content:'Are you sure you want to delete this Interview?',      
          onOk(){ 
            axios.delete(`http://localhost:3001/delete_interview/${interviewID}`)
            .then( () => {
              window.location.reload(false);
            })
          },
          okText:'Delete',
          cancelText:'Cancel',
          okButtonProps:{
            style: {backgroundColor: '#C10000'}
          }
      })
       
      }

  

  return (
    <div className='Interviews'>
        <div className="container">
            <SidebarInterview/>
            <div className="main">
               <h1 style={{textAlign:"Left", fontSize:"26px", marginTop:"29px"}}>Interviews</h1>

                <div className="create-interview">
                    <button onClick={handleOpenDialog}>Create Interview</button>
                </div>

                
                {/* //! dialog create interview */}
                <CreateInterview open={openDialog} handleClose={handleCloseDialog}/>

                {/* //! dialog show details */}
                <Dialog open={openDetails} onClose={closeShowDetails} PaperProps={{ sx: { width: "43.7%", height: "100%" } }}>
                  <DialogTitle className='dialog-title'>Interview Details</DialogTitle>
                  <DialogContent className='dialog-content'>
                    <h2 className='dialog-detail-title'>{title}</h2>
                    <div className="time-details">
                      <div className="date-detail">
                        <i class="fas fa-briefcase"></i>
                        <p>{moment(date).format('DD/MM/YYYY')}</p>
                      </div>
                      <div className="clock-detail">
                        <i class="fas fa-clock"></i> 
                        <p>{start_hour} - {end_hour}</p>
                      </div>
                    </div>
                    <hr />

                    <h4>Interview link</h4>
                    <div className="interview-link">
                      <div className="input-link">
                      <input type="text" name="link" value={link} />
                      <span><LinkIcon/></span>
                      </div>
                      <button className='call-room'>Go to call room</button>
                    </div>

                    <h4>Candidate</h4>
                    <div className="candidate-info">
                      <div className="candidate-mail">
                        <AccountCircleIcon style={{width:"50px", height:'50px', color:'#c10000'}}/>
                        <p>{candidate_email}</p>
                      </div>
                      <button className='notify' onClick={notify_candidate}>Notify Candidate</button>
                    </div>

                    <h4>Test</h4>
                    <div className="test-detail">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore maint occaecat cupidatat non </p>

                    </div>
                    </DialogContent>

                </Dialog>

                {/* //! dialog edit interview */}
                <Dialog  open={openEdit} onClose={closeEditDialog}  className='dialog' PaperProps={{ sx: { width: "40%", height: "82%" } }}
>
                    <DialogTitle className='dialog-title'>Edit Interview details</DialogTitle>
                      <DialogContent className='dialog-content'>
                        <form onSubmit={handleSubmit(update_interview)}>
                          <div className="dialog-field">
                              <label>Interview title</label>
                              <input type="text"  value={title} name='title' 
                                onChangeCapture={(e)=>{setTitle(e.target.value)}}
                                {...register("title" )}
                              />
                              <p className='errors-dialog'>{errors.title && errors.title.message}</p>

                          </div>

                          <div className="dialog-field">
                              <label>Candidate email</label>
                              <input type="email" value={candidate_email} name='candidate_email'
                                onChangeCapture={(e)=>{setCandidateEmail(e.target.value)}}
                                {...register("candidate_email", {
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

                                value={date}

                                {...register("date")}
                                onChangeCapture={(e)=>{setdate(e.target.value)}}

                              />
                            <p className='errors-dialog' >{errors.date && errors.date.message}</p>

                          </div>


                          <div className="dialog-field-align">
                            <label>Interview Time</label>

                            <div className="dialog-field-time">
                              <div className="dialog-time">
                                  <input type="time"  name='start_hour'
                                    value={start_hour}
                                    {...register("start_hour")}
                                    onChangeCapture={(e)=>{setStartHour(e.target.value)}}
                                  />
                                <p className='errors-dialog' >{errors.start_hour && errors.start_hour.message}</p>

                              </div>

                              <div className="dialog-time-to">
                                <input type="time"  name='end_hour' 
                                value={end_hour}
                                onChangeCapture={(e)=>{setEndHour(e.target.value)}}
                                {...register("end_hour")}

                                /> 
                              <p className='errors-dialog' >{errors.end_hour && errors.end_hour.message}</p>

                              </div>

                              
                            </div>
                          </div>

                          <div className="dialog-field" >
                            <label htmlFor="test">Choose a test</label>
                            <select className="select-test" name="test" {...register("test")} >
                              <option value="test1">test1</option>
                              <option value="test2">test2</option>
                              <option value="test3">test3</option>
                              <option value="test4">test4</option>
                              
                            </select>
                            <p className='errors-dialog' >{errors.test && errors.test.message}</p>

                          </div>
                          <div className="dialog-buttons-edit">
                            <button  className='dialog-save-edit'>Update Interview</button>
                          </div>
                      </form>
                      <button onClick={closeEditDialog} className='dialog-cancel-edit'>Cancel</button>

                      
                    
                  </DialogContent>
                  <ToastContainer/>
                  </Dialog>







                <div className="table-interviews">
                <TableContainer style={{marginTop:"10px"}} >
                    <Table sx={{ maxWidth: 1000}} aria-label="customized table" className='tableInts' >
                        <TableHead>
                        <TableRow >
                            <StyledTableCell align='left' >Title</StyledTableCell>
                            <StyledTableCell align="left">Status</StyledTableCell>
                            <StyledTableCell align="left">Date</StyledTableCell>
                            <StyledTableCell align="left">Hour</StyledTableCell>
                            <StyledTableCell align="left">Actions</StyledTableCell>
                          
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {interviews.map((item, i) => {
                          return(
                            <StyledTableRow key={i} content={item} >
                            <StyledTableCell align='left' >{item.title}</StyledTableCell>
                            <StyledTableCell align="left">{item.status}</StyledTableCell>
                            <StyledTableCell align="left">{item.date} </StyledTableCell>
                            <StyledTableCell align="left">{item.start_hour}</StyledTableCell>
                            <StyledTableCell align="left">
                            <div className="actions-icons">
                                    <div className="show-icon">
                                      <RemoveRedEyeOutlinedIcon onClick={() => showDetails(item._id)} style={{color:' #a5a5a5', cursor:'pointer', width:'20px'}}/>
                                    </div>
                                    <div className="edit-icon">
                                       <EditOutlinedIcon onClick={()=>{setInterviewID(item._id) ;handleEditDialog(item._id)}} 
                                        style={{color:'#DC6C6C', cursor:'pointer', width:'20px'}}/>
                                    </div>
                                    
                                    <div className="delete-icon">
                                      <DeleteOutlinedIcon onClick={() => deleteing_Interview(item._id)} style={{color:'#e01e37', cursor:'pointer', width:'20px'}}/>

                                    </div>

                                </div>
                            </StyledTableCell>

                            </StyledTableRow>
                          )
                        })}
                          
                           
                            
                        </TableBody>
                    </Table>
                </TableContainer>

                </div>
            </div>
        </div>

    </div>
  )
}

export default Interviews