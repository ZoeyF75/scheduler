import React, { useEffect } from 'react';
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode';
import Confirm from './Confirm';
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETE";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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

  function save(name, interviewer, isNew) {
    transition(SAVING, true);
    const interview = {
      student: name,
      interviewer
    };

  props.bookInterview(props.id, interview, isNew)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }

  function cancel(id, interview) {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  return(
    <article className="appointment" data-testid="appointment"> 
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && 
        <Form 
          name={props.name} 
          value={props.value} 
          interviewers={props.interviewers} 
          onCancel={back}
          onSave={save}
          isNew={true} 
          />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === CONFIRM && 
        <Confirm message="Are you sure?" onCancel={back} onConfirm={cancel}/>}
      {mode === DELETING && 
        <Status message="Deleting" onCancel="" />}
        {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={back}
          isNew={false} 
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
        message="Could not save appointment."
          onClose={back }
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Could not delete appointment."
          onClose={back}
        />
      )}
    </article>
  );
}