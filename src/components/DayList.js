import React from "react";
import DayListItem from "components/DayListItem";

const key = () => {
  return Math.floor(Math.random() *1000);
}

export default function DayList(props) {
  const mappedList = props.days.map(day => {
    return(
      <DayListItem 
      key={key()}
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.day}
      setDay={props.setDay}  />
    )
  });

  return(
    <ul> {mappedList} </ul>
  )
}