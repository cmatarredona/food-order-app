import React from "react";
import styles from "./Input.module.css";
const Input = React.forwardRef((props, ref) => {
  return (
    <React.Fragment>
      <div className={styles.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input ref={ref} {...props.input} />
      </div>
      <div>
        {props.input.error && <p>Please enter a valid {props.label}</p>}
      </div>
    </React.Fragment>
  );
});
export default Input;
