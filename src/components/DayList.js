import React from "react";
import DayListItem from "components/DayListItem";

//combines each item form DayListItem
export default function DayList(props) {
  const mappedList = props.days.map(day => {
    return(
      <DayListItem 
      key={day.id}
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.day}
      setDay={props.setDay}  />
    )
  });

  return(
    <ul>{mappedList}</ul>
  )
}