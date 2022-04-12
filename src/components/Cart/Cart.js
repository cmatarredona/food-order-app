import React, { useContext } from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem/CartItem";
import CartContext from "../../store/cart-context";
const Cart = (props) => {
  const cartConext = useContext(CartContext);
  const cartItemRemove = (id) => {
    cartConext.removeItem(id);
  };
  const cartItemAdd = (item) => {
    cartConext.addItem(item);
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartConext.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            onRemove={cartItemRemove.bind(null, item.id)}
            onAdd={cartItemAdd.bind(null, { ...item, amount: 1 })}
            {...item}
          />
        );
      })}
    </ul>
  );
  const hasItems = cartConext.items.length > 0;
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{cartConext.totalAmount.toFixed(2)}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button className={styles.button} onClick={props.onAccept}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};
export default Cart;
