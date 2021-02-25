import React, { useState } from 'react';
import Button from "../Button";
import InterviewerList from "../InterviewerList";


export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setInterviewer(null);
    return;
  };

  const cancel = () => {
    reset();
    props.onCancel();
  }

  const save = () => {
    props.onSave(name, interviewer, props.isNew);
  }

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    save();
  }

  return(
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      {/* prevents page refresh */}
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        {/* input where student enters name */}
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          data-testid="student-name-input"
        />
      </form>
      <section className="appointment__validation">{error}</section>
      <InterviewerList 
        interviewers={props.interviewers} 
        value={interviewer} 
        onChange={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={validate}>Save</Button>
      </section>
    </section>
    </main>
  );
}