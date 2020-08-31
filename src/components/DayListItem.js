import React from "react";
import "components/DayListItem.scss";
const classNames = require('classnames');

export default function DayListItem(props) {
  const dayListItemClass = classNames('day-list__item', {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })
  return (
    <li onClick={() => {
      props.setDay(props.name)
    }}>
      <div className={dayListItemClass}>
        <h2 >{props.name}</h2>
        <h3 >{props.spots}</h3>
      </div>
    </li>
  );
}