import React from 'react'
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


function TestDetail() {
  return (
    <div className='TestDetail'>
        <div className="container">
           <SidebarTests/>
            <div className="main">
               <h1 style={{textAlign:"Left", fontSize:"26px", marginTop:"29px"}}>Sample Full-stack Developer Hiring Test</h1>
               <div className="table-tests">
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
                            <StyledTableCell align='left' >Sample Full-stack Developer Hiring Question</StyledTableCell>
                            <StyledTableCell align="left">Coding</StyledTableCell>
                            <StyledTableCell align="left">12 min </StyledTableCell>
                            <StyledTableCell align="left">5</StyledTableCell>
                            <StyledTableCell align="left"> <ChevronRightIcon className='test-icon'/></StyledTableCell>

       

                            </StyledTableRow>
                            <StyledTableRow >
                            <StyledTableCell align='left' >Sample Full-stack Developer Hiring Question</StyledTableCell>
                            <StyledTableCell align="left">Coding</StyledTableCell>
                            <StyledTableCell align="left">12 min </StyledTableCell>
                            <StyledTableCell align="left">15</StyledTableCell>
                            <StyledTableCell align="left"> <ChevronRightIcon className='test-icon'/></StyledTableCell>

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