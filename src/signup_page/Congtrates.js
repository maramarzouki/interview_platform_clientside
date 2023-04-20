import React from 'react'
import './activation.css';
import { useNavigate } from 'react-router-dom';

function Congtrates() {

    let navigate = useNavigate();

    const goLogin = () =>{
        navigate('/');
    }



  return (
    <div className='activation-page'>
        <div className="activation-container">
           <div className="activation-title">
                <h1>Congratulations 🎊 <br /> Your account has been activated !</h1>
           </div>

           <div className="activation-instruction">
                <p>
                Click on this button to be redirected to login page.
                </p>
           </div>
           <div className="activation-button">
                <button onClick={goLogin}>Login Now</button>
           </div>
        </div>
    </div>
  )
}

export default Congtrates