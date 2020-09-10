import React from "react";
import "components/DayListItem.scss";
const classNames = require('classnames');

export default function DayListItem(props) {
  const dayListItemClass = classNames('day-list__item', {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })
  const formatSpots = () => {
    if (props.spots === 0) {
      return 'no spots remaining'
    }
    else if (props.spots === 1) {
      return '1 spot remaining'
    }
    else {
      return `${props.spots} spots remaining`
    }
  }
  return (
    <li onClick={() => {
      props.setDay(props.name)
    }} data-testid="day">
      <div className={dayListItemClass}>
        <h2 >{props.name}</h2>
        <h3 >{formatSpots()}</h3>
      </div>
    </li>
  );
};