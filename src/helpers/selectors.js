export function getAppointmentsForDay(state, day) {
  const appointmentsOnDay = [];
  const objArray = [];
  //returns id of appointments on given day 
  state.days.map(d => {
    if (d.name === day) {
      d.appointments.forEach(a => appointmentsOnDay.push(a))
    } 
  });
  appointmentsOnDay.filter(id => {
    if (state.appointments[id]) {
      objArray.push(state.appointments[id]);
    }
  });
  return objArray;
}

export const getInterview = (state, i) => {
  if (!i) {
    return null;
  }
  return {
    student: i.student,
    interviewer: {
      id: i.interviewer,
      name: state.interviewers[i.interviewer].name,
      avatar: state.interviewers[i.interviewer].avatar
    }
  }
}

export function getInterviewersForDay(state, day) {
  const interviewersOnDay = [];
  const objArray = [];

  //returns id of appointments on given day 
  state.days.map(d => {
    if (d.name === day) {
      d.interviewers.forEach(i => interviewersOnDay.push(i));
    } 
  });
  interviewersOnDay.filter(id => {
    if (state.interviewers[id]) {
      objArray.push(state.interviewers[id]);
    }
  });
  return objArray;
}

