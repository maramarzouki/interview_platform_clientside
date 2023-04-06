import React, { useState } from 'react'
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


//icons
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import CreateInterview from './CreateInterview';
import LinkIcon from '@mui/icons-material/Link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

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
    //controling form
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

    // function to test if edit dialog works
    const success = () =>{
      alert('success !');
    }



    //! opening and closing the create interview dialog
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () =>{
      setOpenDialog(true);
    }
    const handleCloseDialog = () =>{
      setOpenDialog(false);
      window.location.reload(true);

    }

    //! opening and closing show details dialog
    const [openDetails, setOpenDetails] = useState(false);
    const handleShowDetails = () => {
      setOpenDetails(true);
    }
    const closeShowDetails = () => {
      setOpenDetails(false);
    }

    //! opening and closing edit interview dialog
    const [openEdit, setOpenEdit] = useState(false);
    const handleEditDialog = () =>{
      setOpenEdit(true);
    }
    const closeEditDialog = () =>{
      setOpenEdit(false);
      window.location.reload(true);

    }

    //deleting interview
    const delete_warning = () =>{
      Modal.confirm({
          title:'Delete Interview',
          content:'Are you sure you want to delete this Interview?',      
          onOk(){
            window.location.reload(false);
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
                    <h2 className='dialog-detail-title'>Interview with front-end candidate</h2>
                    <div className="time-details">
                      <div className="date-detail">
                        <i class="fas fa-briefcase"></i>
                        <p>25/05/2023</p>
                      </div>
                      <div className="clock-detail">
                        <i class="fas fa-clock"></i> 
                        <p>12:00pm - 1:00pm</p>
                      </div>
                    </div>
                    <hr />

                    <h4>Interview link</h4>
                    <div className="interview-link">
                      <div className="input-link">
                      <input type="text" name="link" placeholder='https://www.hackupinterview/' />
                      <span><LinkIcon/></span>
                      </div>
                      <button className='call-room'>Go to call room</button>
                    </div>

                    <h4>Candidate</h4>
                    <div className="candidate-info">
                      <div className="candidate-mail">
                        <AccountCircleIcon style={{width:"50px", height:'50px', color:'#c10000'}}/>
                        <p>candidate@gmail.com</p>
                      </div>
                      <button className='notify'>Notify Candidate</button>
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
                          <div className="dialog-buttons">
                            <button onClick={closeEditDialog} className='dialog-cancel'>Cancel</button>
                            <button  className='dialog-save'>Create Interview</button>
                          </div>
                      </form>
                      
                    
                  </DialogContent>
                  
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
                        
                            <StyledTableRow >
                            <StyledTableCell align='left' >Interview with front-end candidate</StyledTableCell>
                            <StyledTableCell align="left">Not started</StyledTableCell>
                            <StyledTableCell align="left">05/05/2023 </StyledTableCell>
                            <StyledTableCell align="left">12:00 pm</StyledTableCell>
                            <StyledTableCell align="left">
                            <div className="actions-icons">
                                    <div className="edit-icon">
                                       <EditOutlinedIcon onClick={handleEditDialog} style={{color:'#DC6C6C', cursor:'pointer', }}/>
                                    </div>
                                    <div className="show-icon">
                                      <RemoveRedEyeOutlinedIcon onClick={handleShowDetails} style={{color:' #a5a5a5', cursor:'pointer'}}/>
                                    </div>
                                    <div className="delete-icon">
                                      <DeleteOutlinedIcon onClick={delete_warning} style={{color:'#e01e37', cursor:'pointer'}}/>

                                    </div>

                                </div>
                            </StyledTableCell>

                            </StyledTableRow>
                            <StyledTableRow >
                            <StyledTableCell align='left' >Interview with front-end candidate</StyledTableCell>
                            <StyledTableCell align="left">Not started</StyledTableCell>
                            <StyledTableCell align="left">05/05/2023 </StyledTableCell>
                            <StyledTableCell align="left">12:00 pm</StyledTableCell>
                            <StyledTableCell align="left">
                            <div className="actions-icons">
                                    <EditOutlinedIcon onClick={handleEditDialog} style={{color:'#DC6C6C', cursor:'pointer'}}/>
                                    <RemoveRedEyeOutlinedIcon onClick={handleShowDetails} style={{color:' #a5a5a5', cursor:'pointer'}}/>
                                    <DeleteOutlinedIcon onClick={delete_warning} style={{color:'#e01e37', cursor:'pointer'}}/>

                                </div>
                            </StyledTableCell>

                            </StyledTableRow>
                            
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