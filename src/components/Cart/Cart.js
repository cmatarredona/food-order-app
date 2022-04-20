import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem/CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const cartConext = useContext(CartContext);
  const cartItemRemove = (id) => {
    cartConext.removeItem(id);
  };
  const cartItemAdd = (item) => {
    cartConext.addItem(item);
  };
  const acceptOrder = () => {
/*     props.onAccept(); */
    setShowCheckout(true);
  };
  const closeOrder = () => {
    props.onClose();
    setShowCheckout(false);
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
  const actionButtons = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={closeOrder}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={acceptOrder}>
          Order
        </button>
      )}
    </div>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{cartConext.totalAmount.toFixed(2)}</span>
      </div>
      {console.log(showCheckout)}
      {showCheckout ? <Checkout onCancel={props.onCancel}/> : actionButtons }
    </Modal>
  );
};
export default Cart;
