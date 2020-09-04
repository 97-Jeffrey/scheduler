import React ,{useEffect} from "react";
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from './Show';
import Form from "./Form";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = 'CREATE';

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )
 console.log(mode);


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={()=>transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      )}
      {mode === CREATE && 
      <Form 
       interviewers={props.interviewers}
       onCancel={()=>back()}
      />}
    </article>
  )
}