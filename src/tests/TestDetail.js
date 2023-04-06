import React, { useState } from 'react'
import SidebarTests from '../sidebar/SidebarTests'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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

    // hide last border
    '&:last-child td, &:last-child th': {
        
    },

    '&:nth-of-type(even)':{
        backgroundColor: theme.palette.action.hover,

    }
  }));

//dialog   

function TestDetail() {

  const [openQuestion, setOpenQuestion] = useState(false);
  const handleOpenDialog = () => {
    setOpenQuestion(true);
  }
  const handleCloseDialog = () => {
    setOpenQuestion(false);
  }



  return (
    <div className='TestDetail'>
        <div className="container">
           <SidebarTests/>
            <div className="main">
               <h1 style={{textAlign:"Left", fontSize:"26px", marginTop:"29px"}}>Sample Full-stack Developer Hiring Test</h1>
               <div className="table-tests">

                {/* dialog */}
                <Dialog open={openQuestion} onClose={handleCloseDialog} PaperProps={{ sx: { width: "60%", height: "82%" } }}>
                     <DialogTitle className='dialog-question-title'>Buying show Tickets</DialogTitle>
                     <DialogContent>
                      <div className="question">
                      <p>Alex plans on visiting the museum and is at the counter to purchase tickets to get in. Tickets are sold only one at a time.</p>
                      </div>
                      <div className="question-example">
                        <h4>Example</h4>
                       <p>n = 3 <br />
                        tickets = [1, 2, 5] <br />
                        There are 3 buyers needing 1, 2 and 5 tickets each. Alex is at index 1 and need 2 tickets. The first six units of time, t = 0 through t = 5, are as shown below:
                        </p> 
                      </div>
                      <div className="question-desc">
                         <h4>Function Description</h4>
                          <p> Complete the function waitingTime in the editor below. The function must return an integer representing the units of time it takes Alex to purchase the desired number of tickets.
                              waitingTime has the following parameter(s):
                              int tickets [n]: a zero-indexed array of tickets desired by the person i at position tickets[i]
                            int p: Alex's position in line
                          </p>

                      </div>
                      <div className="question-constraints">
                        <h4>Constraints</h4>
                        <p>
                          1 ≤ n ≤ 105
                          1 ≤ tickets[i] ≤ 109, where 0 ≤ i ≤  n.
                        </p>
                      </div>
                      <div className="question-input">
                        <h4>Input Format for Custom Testing</h4>
                         <p>Input from stdin will be processed as follows and passed to the function.
                            The first line contains an integer n, the size of the array tickets.
                        </p>
                      </div>
                     </DialogContent>

                </Dialog>

                {/* table */}
                <TableContainer style={{marginTop:"50px"}} >
                    <Table sx={{ maxWidth: 1000}} aria-label="customized table"  >
                        <TableHead>
                        <TableRow >
                            <StyledTableCell align='left' width={'300px'} >Questions</StyledTableCell>
                            <StyledTableCell align="left">Type</StyledTableCell>
                            <StyledTableCell align="left">Time</StyledTableCell>
                            <StyledTableCell align="left">Score</StyledTableCell>
                            <StyledTableCell align="left">Action</StyledTableCell>

                            
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        
                            <StyledTableRow >
                            <StyledTableCell align='left' > Buying show tickets</StyledTableCell>
                            <StyledTableCell align="left">Coding</StyledTableCell>
                            <StyledTableCell align="left">12 min </StyledTableCell>
                            <StyledTableCell align="left">5</StyledTableCell>
                            <StyledTableCell align="left"> 
                                <div className="chevron-right">
                                   <ChevronRightIcon onClick={handleOpenDialog} className='test-icon'  />
                                </div>
                            </StyledTableCell>

       

                            </StyledTableRow>
                            <StyledTableRow >
                            <StyledTableCell align='left' >Profit targets  </StyledTableCell>
                            <StyledTableCell align="left">Coding</StyledTableCell>
                            <StyledTableCell align="left">12 min </StyledTableCell>
                            <StyledTableCell align="left">15</StyledTableCell>
                            <StyledTableCell align="left"> 
                                  <div className="chevron-right">
                                   <ChevronRightIcon onClick={handleOpenDialog} className='test-icon'  />
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

export default TestDetail