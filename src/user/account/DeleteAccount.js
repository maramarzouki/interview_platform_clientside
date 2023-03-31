import React from 'react';
import '../user_style/delete_account.css';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';

function DeleteAccount() {


  const navigate = useNavigate();
  const go_back = () => {
    navigate('/security');
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
              <p>  If you click on "delete my account" button, we will delete all your data </p>
            </div>
            <div className="delete-buttons">
            <button className='go-back' onClick={go_back}>Go back</button>
            </div>
            <div className="delete-buttons">
            <button className='delete-button'>Delete my account</button>

            </div>
        </div>

    </div>
  )
}

export default DeleteAccount