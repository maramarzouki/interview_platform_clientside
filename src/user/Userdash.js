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
  const recruiterID = jwt._id;

  const [title, setTitle] = useState('');
  const [interviewDay, setInterviewDay] = useState('');
  const [interviewMonth, setInterviewMonth] = useState('');
  const [interviewYear, setInterviewYear] = useState('');

  const [start_hour, setStartHour] = useState('');  
  const [end_hour, setEndHour] = useState('');
  const [weekday, setWeekday] = useState('');


  const rec_name = () =>{
    axios.get(`http://localhost:3001/recru_info/${recruiterID}`)
    .then(rec => {
      setFirstName(rec.data.first_name)

    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    rec_name();
    get_today_interviews();
  })

  const [response, setResponse] = useState("");

  const get_today_interviews = () =>{
    axios.get(`http://localhost:3001/get_today_interviews/${recruiterID}`)
    .then((interviews) => {
      setTitle(interviews.data[0].title);
      setInterviewDay(interviews.data[0].day);
      setInterviewMonth(interviews.data[0].month);
      setInterviewYear(interviews.data[0].year);
      setStartHour(interviews.data[0].start_hour);
      setEndHour(interviews.data[0].end_hour);
      setWeekday(interviews.data[0].weekday);
     }).catch(err =>{
      setResponse(err.response.data);
    })
  }
  


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

                
                <div className="meetings-container">
                <p>My meetings</p>
                {response ? <p className='meeting-name'>{response}</p> :
              <>
                  <div className="meeting-content">
                    <div className="meeting-info">
                         <EventBusyIcon style={{fontSize:'20px', color:"#c10000", marginTop:"8px", marginLeft:'8px'}}/>
                        <p style={{fontSize:'12px', marginLeft:'3.5px'}}>{weekday}, {interviewMonth} {interviewDay}, {interviewYear}</p>
                    </div>
                      <div className="meeting-time-container">
                         <p className='time-meeting'>{start_hour} to {end_hour}</p>
                      </div>                   
                  </div>
                  <p className='meeting-name'>{title}</p>
                  </>}
                </div> 

              
            </div> 
        
      </div>



        </div>
            

        </div>
        
    </div>
  )
}

export default Userdash