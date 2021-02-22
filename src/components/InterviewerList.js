import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

function InterviewerList(props) {
  const mappedList = props.interviewers.map(i => {
    return(
      <InterviewerListItem
        key = {i.id}
        name={i.name} 
        avatar={i.avatar} 
        selected = {i.id === props.value}
        setInterviewer={event => props.onChange(i.id)}
        />
    )
  });

  return(
    <section className="interviewers">
    <h4 className="interviewersheader text--light">{props.name}</h4>
    <ul className="interviewers__list">{mappedList}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;
