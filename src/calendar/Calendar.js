import React from 'react'
import SidebarCalendar from '../sidebar/SidebarCalendar'
import './calendar.css';
import EventBusyIcon from '@mui/icons-material/EventBusy';

//calendar
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
function Calendar() {
  return (
    <div className='CalendarDash'>
        <div className="container">
            <SidebarCalendar/>
        </div>
        <div className="main">
          <h1 style={{textAlign:"Left", fontSize:"26px", marginTop:"29px"}}>Calendar</h1>

          <div className="calendar-page">
            <div className="calendar">
            <FullCalendar
                plugins={[dayGridPlugin,timeGridPlugin, interactionPlugin]}
                initialView={"dayGridMonth"}    
                headerToolbar={{
                    start: "prev today next",
                    center: "title",
                    end: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                selectable={true}
                editable={true}
                nowIndicator={true}            
            />
            </div>
            <div className="day-details">
              <p>Details day</p>
              <p className='instruction'>Don't miss scheduled events</p>

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
  )
}

export default Calendar