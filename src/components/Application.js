import React from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay}  from "helpers/selectors";
import useApplicationData from "../hooks/useApplicationData.js";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

   //returns array of objects for given day
   const appointmentObj = getAppointmentsForDay(state, state.day);
   const appointment = appointmentObj.map((a) => {
     const interview = getInterview(state, a.interview);
     const interviewers = getInterviewersForDay(state, state.day);
     return (
     <Appointment
       key={a.id}
       id={a.id}
       time={a.time}
       interview={interview}
       interviewers={interviewers}
       bookInterview={bookInterview}
       cancelInterview={cancelInterview}
     />)
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
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        
      </section>
      <section className="schedule">
        {appointment}
        <Appointment key="last" time="5pm" bookInterview={bookInterview}/>
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}


