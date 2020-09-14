import React, { useState } from "react";

//this is custom hook that returns two setState method and one state
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

//changes are made so i'm no longer manipulating the state by itself, instead to use set function to change the state


  function transition(newMode, replace=false) {
    setMode(newMode);
    if(replace){
      setHistory(()=>[...history.slice(0,history.length-1), newMode])
    }
    setHistory(() => [...history, newMode]);
  };

  function back() {
    if (history.length > 1) {
      setHistory(()=>[...history.slice(0,history.length-1)])
      setMode(() => history[history.length - 3])
    }
  };
  return {
    mode, transition, back
  }
};
