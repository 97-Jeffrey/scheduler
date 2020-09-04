import React ,{useEffect} from "react";
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from './Show';
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = 'CREATE';
const SAVING ='SAVING';
const DELETE ="DELETE";
const CONFIRM ="CONFIRM";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )
 console.log(mode);
  
 function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };
  transition(SAVING);
  props.bookInterview(props.id, interview)
  .then(()=>transition(SHOW));
}


function toDelete(){
  transition(DELETE)
  props.cancelInterview(props.id)
  .then(()=>transition(EMPTY));
}

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={()=>transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={()=>transition(CONFIRM)}
        />
      )}
      {mode === CREATE && 
      <Form 
       interviewers={props.interviewers}
       onCancel={()=>back()}
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
      onCancel={()=>back()}
      />}
    </article>
  )
}