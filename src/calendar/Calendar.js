import React, { useEffect, useState } from 'react'
import SidebarCalendar from '../sidebar/SidebarCalendar'
import './calendar.css';
import EventBusyIcon from '@mui/icons-material/EventBusy';

//calendar
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';

import axios from 'axios';
import jwtDecode from 'jwt-decode';

function Calendar() {

  //getting the recruiter ID
  const token = localStorage.getItem('token');
  const xtoken = jwtDecode(token);
  const recruiterID = xtoken._id;

  //getting interviews

  const [interviews, setInterviews] = useState([]);
 

  const show_interviews = () => {
    axios.get(`http://localhost:3001/get_interviews/${recruiterID}`)
      .then(result => {
        setInterviews(result.data);
        console.log(result.data);
      }).catch(err => {
        console.log(err.response.data);
      })
  }

  //useEffect
  useEffect(() => {
    show_interviews();
    get_today_interviews();

  }, []);

  //mapping data to events format of fullCalendar

  const mapInterviewsToEvents = () => {
    return interviews.map((interview) => {
      const startTime = moment(`${interview.date} ${interview.start_hour}`, 'DD/MM/YYYY HH:mm');
      const endTime = moment(`${interview.date} ${interview.end_hour}`, 'DD/MM/YYYY HH:mm');

      return {
        id: interview._id,
        title: interview.title,
        start: startTime.format(),
        end: endTime.format(),
        // allDay: false,
      };
    });
  };

  // ! showing today's interview
 const [todayInterviewsList, setTodayInterviewsList] = useState();
 const [response,setResponse] = useState("")

  const get_today_interviews = () =>{
    axios.get(`http://localhost:3001/get_today_interviews/${recruiterID}`)
    .then(interviews => {
      console.log(interviews);
      setTodayInterviewsList(interviews.data);
    }).catch(err =>{
      setResponse(err.response.data);
    })
  }

  return (
    <div className='CalendarDash'>
      <div className="container">
        <SidebarCalendar />
      </div>
      <div className="main">
        <h1 style={{ textAlign: "Left", fontSize: "26px", marginTop: "29px" }}>Calendar</h1>

        <div className="calendar-page">
          <div className="calendar">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView={"dayGridMonth"}
              headerToolbar={{
                start: "prev today next",
                center: "title",
                end: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              selectable={true}
              editable={true}
              nowIndicator={true}
              events={mapInterviewsToEvents(interviews)}
            />
          </div>
          <div className="day-details">
            <p>Day details</p>
            <p className='instruction'>Don't miss scheduled events</p>
              {todayInterviewsList?.map((item, i) =>{
                return (
                  <div className="meetings-container" key={item}>
                    <div className="meeting-content">
                <div className="meeting-info">
                  <EventBusyIcon style={{ fontSize: '20px', color: "#c10000", marginTop: "8px", marginLeft: '8px' }} />
                  <p style={{ fontSize: '12px', marginLeft: '3.5px' }}>{item.weekday}, {item.month} {item.day}, {item.year}</p>
                </div>
                <div className="meeting-time-container">
                  <p className='time-meeting'>{item.start_hour} to {item.end_hour}</p>
                </div>
              </div>
              <p className='meeting-name'>{item.title}</p>
              </div>

                )
              })}
              {response && <p className='meeting-name'>{response}</p>} 


           
           </div>
        </div>

      </div>
    </div>
  )
}

export default Calendar