import React from "react";
import "components/InterviewerListItem.scss";
const classNames = require('classnames');

export default function InterviewerListItem(props) {
  const InterviewerListItemClass = classNames('interviewers__item', {
    "interviewers__item--selected ": props.selected,
    "interviewers__item-image": props.avatar
  })
  return (
    <li className={InterviewerListItemClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
        selected={props.selected}
      />
       {props.selected && props.name}
    </li>
  )
};