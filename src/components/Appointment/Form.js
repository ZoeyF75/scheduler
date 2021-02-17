import React from 'react';
import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form(props) {
  return(
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={props.name}
          onChange={event => setName(event.target.value)}
        />
      </form>
      <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={event => cancel()}>Cancel</Button>
        <Button confirm>Save</Button>
      </section>
    </section>
    </main>
  );
}