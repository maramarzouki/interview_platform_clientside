import React from 'react'
import SidebarTests from '../sidebar/SidebarTests'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';
import './tests.css';
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

  




function Tests() {
    
  return (
    <div className='Tests'>
        <div className="container">
            <SidebarTests/>
            <div className="main">
                <h1 style={{textAlign:"Left", fontSize:"26px", marginTop:"29px"}}>Tests</h1>

                <div className="table-tests">
                <TableContainer style={{marginTop:"50px"}} >
                    <Table sx={{ maxWidth: 1000}} aria-label="customized table"  >
                        <TableHead>
                        <TableRow >
                            <StyledTableCell align='center' >Test Id</StyledTableCell>
                            <StyledTableCell align="center">Test name</StyledTableCell>
                            <StyledTableCell align="center">Speciality</StyledTableCell>
                            <StyledTableCell align="center">Years of experience</StyledTableCell>
                            <StyledTableCell align="center">Number of questions</StyledTableCell>
                            <StyledTableCell align="center">Duration</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        
                            <StyledTableRow >
                            <StyledTableCell align='center' >1</StyledTableCell>
                            <StyledTableCell align="center">full stack</StyledTableCell>
                            <StyledTableCell align="center">software </StyledTableCell>
                            <StyledTableCell align="center">0-2 years</StyledTableCell>
                            <StyledTableCell align="center">5</StyledTableCell>
                            <StyledTableCell align="center">90 mins</StyledTableCell>
                            <StyledTableCell align="center"> <Link to={'/testdetail'}><ChevronRightIcon className='test-icon'/></Link> </StyledTableCell>

                            </StyledTableRow>
                            <StyledTableRow >
                            <StyledTableCell align='center' >1</StyledTableCell>
                            <StyledTableCell align="center">full stack</StyledTableCell>
                            <StyledTableCell align="center">software </StyledTableCell>
                            <StyledTableCell align="center">0-2 years</StyledTableCell>
                            <StyledTableCell align="center">5</StyledTableCell>
                            <StyledTableCell align="center">90 mins</StyledTableCell>
                            <StyledTableCell align="center"> <ChevronRightIcon className='test-icon'/></StyledTableCell>

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

export default Tests