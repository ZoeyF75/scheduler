import React, { useEffect } from 'react';
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import useVisualMode from 'hooks/useVisualMode';
import Confirm from './Confirm';
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  useEffect(() => {
    
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
    
    if (!props.interview && mode === SHOW) {
      transition(EMPTY);
    }

  }, [mode, transition, props.interview])

  function save(name, interviewer) {
    transition(SAVING);

    const interview = {
      student: name,
      interviewer
    };

  props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
  }

  function cancel(id, interview) {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY));
  }

  return(
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && 
        <Form 
          name={props.name} 
          value={props.value} 
          interviewers={props.interviewers} 
          onCancel={back}
          onSave={save}/>}
      {mode === SAVING && <Status message="Saving" />}
      {mode === CONFIRM && 
        <Confirm message="Are you sure?" onCancel={back} onConfirm={cancel}/>}
      {mode === DELETING && 
        <Status message="Deleting" onCancel="" />}
    </article>
  );
}