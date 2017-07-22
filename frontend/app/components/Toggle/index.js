/**
*
* LocaleToggle
*
*/

import React from "react";

import ToggleOption from "../ToggleOption";

function Toggle(props) {
  let content = <option>--</option>;

  // If we have items, render them
  if (props.values) {
    content = props.values.map(value => (
      <ToggleOption key={value} value={value} message={props.messages[value]} />
    ));
  }

  return (
    <select value={props.value} onChange={props.onToggle}>
      {content}
    </select>
  );
}

export default Toggle;
