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

