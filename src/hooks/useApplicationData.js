import { useState, useEffect } from "react";
import axios from "axios";

export function useApplicationData() {
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
    // setState({ ...state, appointments });

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState(prev => ({
          ...prev, appointments
        }));
      })
      .then(() => {
        axios.get(`/api/days`)
          .then(result => {
            setState(prev => ({
              ...prev, days: result.data
            }))
          })
      })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    // setState({...state,appointments});
    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState(prev => ({
          ...prev, appointments
        }))
      })
      .then(() => {
        axios.get(`/api/days`)
          .then(result => {
            setState(prev => ({
              ...prev, days: result.data
            }))
          })
      })

  }

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ])
      .then(all => {
        console.log(all)
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }))
      })
  }, [])

  return { state, setDay, setState, bookInterview, cancelInterview };

}