/**
 * reusable button
 *
 * children: the button text, e.g.: <Button>sometext</Button
 */

import { buttonBaseClasses } from "../baseClasses";

const Button = (props) => {
  let btnClass = buttonBaseClasses;
  if (props.className) {
    btnClass += " " + props.className;
  }
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={btnClass}
    >
      {props.children}
    </button>
  );
};

export default Button;
