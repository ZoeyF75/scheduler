import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

const spotsAvailable = (spots) => {
  if (!spots) {
    return "no spots remaining";
  } 
  if (spots === 1) {
    return "1 spot remaining";
  } 
  else {
    return spots + " spots remaining";
  }
}

export default function DayListItem(props) {
  const dayListItemClass = classNames("day-list__item", {
    "day-list__item--selected" : props.selected,
    "day-list__item--full" : !(props.spots)
  });

  return (
    <li className= { dayListItemClass } onClick={() => props.setDay(props.name)} >
      <h2 className="text--regular">{ props.name }</h2> 
      <h3 className="text--light">{ spotsAvailable(props.spots) }</h3>
    </li>
  );
}

