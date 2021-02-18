import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from 'axios';

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    // interview: {
    //   student: "Frank Ocean",
    //   interviewer: {
    //     id: 3,
    //     name: "Mildred Nazir",
    //     avatar: "https://i.imgur.com/T2WwVfS.png",
    //   }
    // }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Bill Nye",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 5,
    time: "11am",
    interview: {
      student: "Edgar Allen Poe",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  }
];


export default function Application(props) {
  const [day, setDay] = useState('Monday');
  const [days, setDays] = useState([]);
  
  useEffect(() => {
    const url = "http://localhost:8001/api/days"
    axios.get(url)
    .then(res => {
      setDays(res.data);
      console.log(res.data)
    })
  }, [days])

  const Appointments = appointments.map((a) => {
    return (<Appointment key={a.id} {...a}/>)
  })

  return (
    <main className="layout">
      <section className="sidebar">

      <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={day}
            setDay={day => setDay(day)}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        
      </section>
      <section className="schedule">
        {Appointments}
        <Appointment key="last" time="5pm" />
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}


