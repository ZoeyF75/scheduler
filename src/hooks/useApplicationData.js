import { useState, useEffect } from "react";
import axios from 'axios';
//import Daylist is in application.js

const getDay = (day) => {
  const idOfDay = {
    "Monday" : 0,
    "Tuesday": 1,
    "Wednesday": 2,
    "Thursday": 3,
    "Friday": 4
  }
  return idOfDay[day];
}

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });
  
  const setDay = (day) => setState({ ...state, day });
  
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers'))
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    //gets index of selected day
    const idOfDay = getDay(state.day);

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //days@selected day decreases spot by one
    const day = {
      ...state.days[idOfDay],
      spots: state.days[idOfDay].spots - 1
    }
   
    const days = [...state.days];
    days[idOfDay] = day;

    return axios.put(`/api/appointments/${id}`, {interview})
    .then(res => {
        setState({...state, appointments, days})
        return res
      })
  }
  
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    const idOfDay = getDay(state.day);

    const day = {
      ...state.days[idOfDay],
      spots: state.days[idOfDay].spots + 1
    }

    const days = state.days
    days[idOfDay] = day;

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({...state, appointments, days})
      })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
   } 
}
