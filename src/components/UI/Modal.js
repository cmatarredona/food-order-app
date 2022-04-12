import React from "react";
import ReactDOM, { createPortal } from "react-dom";
import styles from "./Modal.module.css";
const Backdrop = (props) => {
  return <div onClick={props.onClose} className={styles.backdrop}></div>;
};
const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};
const Modal = (props) => {
    const portalElement=document.getElementById("overlays");
  return (
    <React.Fragment>
      {createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
      {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </React.Fragment>
  );
};
export default Modal;
