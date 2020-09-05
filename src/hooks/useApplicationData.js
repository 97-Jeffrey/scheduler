import { useState, useEffect } from "react";
import axios from "axios";

export function useApplicationData(){
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({ ...state, appointments });

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {setState(prev => ({
         ...prev, appointments
        }));
      })
  }

  function cancelInterview(id){
    const appointment={
      ...state.appointments[id],
      interview:null
    }
    const appointments={
      ...state.appointments,
      [id]: appointment
    }
    setState({...state,appointments});
    return axios.delete(`/api/appointments/${id}`, appointments)
    .then(()=>{
      setState(prev=>({
        ...prev, appointments
      }))
    })

  } 



return {state, setDay,setState, bookInterview, cancelInterview};

}