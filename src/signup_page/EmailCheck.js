import React from 'react'
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import { useNavigate } from 'react-router-dom';
function EmailCheck() {

    const navigate = useNavigate();
    const go_back = () =>{
        navigate('/');
        window.location.reload(false);
    }

  return (
         <div className='container-fg-pwd'>
        <div className="form-fg">
            <div className="fg-content">
                
                 <div className="fg-icon">
                    <MarkEmailUnreadIcon style={{fontSize:"37px", color:"#C10000"}}/>
                </div>
                 <div className="fg-title">
                    <h1> Account successfully created! </h1>
                </div>
              

                <div className="fg-instruction">
               <p style={{fontSize:'14px'}}>We sent a verification mail to your email <br /> check to login!</p> 
                </div>
                <br />
                
                   
                    <div className="fg-button">
                        <button onClick={go_back}>Go back</button>
                    </div>
               
            </div>
        </div>
        
        
    </div>
  )
}

export default EmailCheck