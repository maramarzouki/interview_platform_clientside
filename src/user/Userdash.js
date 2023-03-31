import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import './user_style/userdash.css';
import { Link } from 'react-router-dom';
import './user_style/calendar.css';
import Calendar from 'react-calendar';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

function Userdash() {
  //calendar current date
  const [date, setDate] = useState(new Date());
  // getting firstname
  const [firstname, setFirstName] = useState('');
  const token = localStorage.getItem('token');
  const jwt = jwtDecode(token);
  const recuiterID = jwt._id;


  const rec_name = () =>{
    axios.get(`http://localhost:3001/recru_info/${recuiterID}`)
    .then(rec => {
      setFirstName(rec.data.first_name)

    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    rec_name();
  })

  


  return (
    <div className='userdash'>
        <div className="container">
            <Sidebar/>

        <div className="main">
        <h1 style={{textAlign:"Left", fontSize:"26px", marginTop:"29px"}}>Dashboard</h1>
        
        <div className="dashboard">
            <div className="mini-dashboard">
                    <div className="box-schedule">
                      <div className="content">
                        <h1 style={{textTransform:'capitalize'}}>Hi, {firstname}</h1>
                        <p>You have 2 Interviews to finish this week</p>
                        <button>View schedule</button>
                      </div>
                      <div className="calendar">
                        <img src="images/calendar.png" alt="calendar" width={"230px"} height={'180px'}/>
                      </div>
                    </div>
                    <div className="last-added-tests">
                      <div className="texts">
                        <h4>Last added tests</h4> 
                        <Link to={'/tests'}><p>View all</p></Link>
                      </div>
                    </div>

                    <div className="samples-box">
                      <div className="samples-cards">
                        <div className="test-card">
                          <h6>Sample Full-stack Developer Hiring Test</h6>
                          <p>Software engineer</p> 
                          <div className='content'>
                            <p>Questions: 4</p>
                            <p>Duration: 90 min </p>
                          </div>
                          <button>See more</button>
                        </div>
                        <div className="test-card">
                          <h6>Sample Full-stack Developer Hiring Test</h6>
                          <p>Software engineer</p> 
                          <div className='content'>
                            <p>Questions: 4</p>
                            <p>Duration: 90 min </p>
                          </div>
                          <button>See more</button>
                        </div>
                      </div>
                

                    </div>
                    <div className="samples-box">
                      <div className="samples-cards">
                        <div className="test-card">
                          <h6>Sample Full-stack Developer Hiring Test</h6>
                          <p>Software engineer</p> 
                          <div className='content'>
                            <p>Questions: 4</p>
                            <p>Duration: 90 min </p>
                          </div>
                          <button>See more</button>
                        </div>
                        <div className="test-card">
                          <h6>Sample Full-stack Developer Hiring Test</h6>
                          <p>Software engineer</p> 
                          <div className='content'>
                            <p>Questions: 4</p>
                            <p>Duration: 90 min </p>
                          </div>
                          <button>See more</button>
                        </div>
                      </div>
                  </div>
            </div>
            <div className="calendar-dashboard">
              <p>My calendar</p>
              <div className="calendar-container">
                <Calendar onChange={setDate} value={date} />
              </div>
                <p>My meetings</p>
                <div className="meetings-container">
                  <div className="meeting-content">
                    <div className="meeting-info">
                         <EventBusyIcon style={{fontSize:'20px', color:"#c10000", marginTop:"8px", marginLeft:'8px'}}/>
                        <p style={{fontSize:'12px', marginLeft:'3.5px'}}>Tuesday, March 30, 2023</p>
                    </div>
                      <div className="meeting-time-container">
                         <p className='time-meeting'>12am to 2pm</p>
                      </div>                   
                  </div>
                  <p className='meeting-name'>Front-end developer interview</p>


                </div>

              
            </div>
        
      </div>



        </div>
            

        </div>
        
    </div>
  )
}

export default Userdash