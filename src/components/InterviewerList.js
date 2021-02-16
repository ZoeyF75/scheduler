import React from "react";
import "components/InterviewerListItem.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const mappedList = props.interviewers.map(i => {
    return(
      <InterviewerListItem
        key = {i.id}
        name={i.name} 
        avatar={i.avatar} 
        selected = {i.id === props.i}
        setInterviewer={event => props.setInterviewer(i.id)}
        />
    )
  });

  return(
    <section className="interviewers">
    <h4 className="interviewersheader text--light">{props.name}</h4>
    <ul className="interviewerslist">{mappedList}</ul>
    </section>
  );
}
