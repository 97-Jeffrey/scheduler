import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function From(props) {
  console.log('these are props passed in:',props.interviewer);
  const [name, setName]= useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  function reset(){
    setName("");
    setInterviewer(null);
  }

  function cancel(){
    reset();
    props.onCancel();
  }
  
  function saveBoth(){
    props.onSave(name, interviewer)
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
          /*
            This must be a controlled component
          */
          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={saveBoth}>Save</Button>
        </section>
      </section>
    </main>
  )
}
