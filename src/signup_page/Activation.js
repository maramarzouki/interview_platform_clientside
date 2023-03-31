import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './activation.css';
import { useNavigate } from 'react-router-dom';

function Activation() {
 


    const {activationcode} = useParams()
    axios.post(`http://localhost:3001/verify_user/${activationcode}`).
    then(result=>{
        alert("alert:",result.response.data)
        console.log(activationcode);
    }).catch(err=>{
        alert(err.response.data.err)
        console.log(activationcode);
    })


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
                    Click on this button to redirects you to login page
                </p>
           </div>
           <div className="activation-button">
                <button onClick={goLogin}>Login Now</button>
           </div>
        </div>
    </div>
  )
}

export default Activation