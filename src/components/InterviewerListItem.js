import React from "react";
import "components/InterviewerListItem.scss";
const classNames = require('classnames');

export default function InterviewerListItem(props) {
  const InterviewerListItemClass = classNames( {
    'interviewers__item':true,
    "interviewers__item--selected ": props.selected,
    "interviewers__item-image": props.avatar,
    // "interviewers__item--selected-image": props.avator && props.selected
  })
  return (

    <li className={InterviewerListItemClass}>
      <img
        className={InterviewerListItemClass}
        src={props.avatar}
        alt={props.name}
        selected={props.selected}
        onClick={props.setInterviewer}
      />
       {props.selected &&<>{props.name}</>}
    </li>
  )

}