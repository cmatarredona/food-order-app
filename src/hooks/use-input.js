import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouch, setisTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouch;

  const valueChangeHandle = (event) => {
    setEnteredValue(event.target.value);
  };
  const inputBlurHandle = () => {
    setisTouched(true);
  };
  const reset = () => {
    setEnteredValue("");
    setisTouched(false);
  };
  return {
    value: enteredValue,
    hasError,
    valueChangeHandle,
    inputBlurHandle,
    reset,
  };
};
export default useInput;
