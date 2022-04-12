import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";
const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const numCartItems = cartCtx.items.reduce((prev, cur) => {
    return prev + cur.amount;
  },0);
  const [btnAnimated,setbtnAnimated]=useState(false);
  useEffect(()=>{
    if(cartCtx.items.length===0)return;
    setbtnAnimated(true);
    const timer=setTimeout(()=>{
      setbtnAnimated(false);
    },300);
    return()=>{
      clearTimeout(timer);
    };
  },[cartCtx.items])
  const buttonClasses=`${styles.button} ${btnAnimated && styles.bump}`;
  return (
    <React.Fragment>
      <button onClick={props.onOpenCart} className={buttonClasses}>
        <span className={styles.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={styles.badge}>{numCartItems}</span>
      </button>
    </React.Fragment>
  );
};
export default HeaderCartButton;
