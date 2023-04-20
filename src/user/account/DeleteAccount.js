import React from 'react';
import '../user_style/delete_account.css';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

function DeleteAccount() {

   //token and recruiter ID
   const token = localStorage.getItem('token');
   const xtoken = jwtDecode(token);
   const recruiterID = xtoken._id;

  const navigate = useNavigate();
  const go_back = () => {
    navigate('/security');
  }


  const delete_account = () =>{
    axios.delete(`http://localhost:3001/delete_recru_account/${recruiterID}`)
    .then(() => {
      navigate('/');
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  return (
    <div className='DeleteAccount'>
        <div className="delete-container">
            <div className="delete-icon">
                <ErrorOutlineIcon style={{fontSize:"60px", color:"#C10000"}}/>
            </div>
            <div className="delete-title">
                <h1>Are you sure you want to delete your account?</h1>
            </div>
            <div className="delete-instruction">
              <p>  If you click on "delete my account" button, all your data will be deleted! </p>
            </div>
            <div className="delete-buttons">
            <button className='go-back' onClick={go_back}>Go back</button>
            </div>
            <div className="delete-buttons">
            <button className='delete-button' onClick={delete_account}>Delete my account</button>

            </div>
        </div>

    </div>
  )
}

export default DeleteAccount