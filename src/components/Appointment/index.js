import React, { useEffect } from "react";
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from './Show';
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

// these varibales are used as conditions to change interface display

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))
  }

  function toDelete() {
    transition(DELETE)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true))
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />}
      {mode === SAVING && <Status
        message='Saving'
      />}
      {mode === DELETE && <Status
        message='Deleting'
      />}
      {mode === CONFIRM && <Confirm
        message="Are you sure you would like to delete?"
        onConfirm={toDelete}
        onCancel={() => back()}
      />}
      {mode === EDIT && <Form
        name={props.interview.student}
        interviewers={props.interviewers}
        interviewer={props.interview.interviewer.id}
        bookInterview={props.bookInterview}
        abc="123"
        onSave={save}
        onCancel={() => transition(SHOW)}
      />}
      {mode === ERROR_SAVE && <Error
        message="Cannot save, try again please"
        onClose={() => back()} />}
      {mode === ERROR_DELETE && <Error
        message="Cannot delete, try again please"
        onClose={() => back()} />}
    </article>
  )
};