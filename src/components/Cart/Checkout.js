import { useContext, useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import CartContext from "../../store/cart-context";
import CartProvider from "../../store/CartProvider";
import Input from "../UI/Input";
import styles from "./Checkout.module.css";
const Checkout = (props) => {
  const validateNoEmpty = (value) => value.trim() !== "";
  const inputName = useInput(validateNoEmpty);
  const inputStreet = useInput(validateNoEmpty);
  const inputPC = useInput(validateNoEmpty);
  const inputCity = useInput(validateNoEmpty);
  const [order, setOrders] = useState();
  const cart = useContext(CartContext);
  const addOrder = (order) => {
    setOrders(order);
  };
  const x = useHttp();
  const SubmitData = (order) => {
    if (!formIsValid) return;
    x.sendRequest(
      {
        url: "https://react-course-ba89e-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
        method: "POST",
        body: order,
        headers: {
          "Content-Type": "application/json",
        },
      },
      addOrder
    );
    console.log(x);
  };
  const confirmHandle = (event) => {
    event.preventDefault();
    SubmitData({
      userData: {
        name: inputName.value,
        street: inputStreet.value,
        pc: inputPC.value,
        city: inputCity.value,
      },
      items: {
        ...cart.items,
      },
    });
  };
  if (!x.error && order) {
    cart.emptyCart();
    return <h1>Ordered!</h1>;
  }
  console.log(x);
  const formIsValid =
    !inputName.hasError &&
    !inputStreet.hasError &&
    !inputPC.hasError &&
    !inputCity.hasError;
  return (
    <form onSubmit={confirmHandle} className={styles.form}>
      <div className={styles.control}>
        <Input
          input={{
            id: "name",
            type: "text",
            value: inputName.value,
            onChange: inputName.valueChangeHandle,
            onBlur: inputName.inputBlurHandle,
            error: inputName.hasError,
            required: true,
          }}
          label={"Your name"}
        />
        <Input
          input={{
            id: "street",
            type: "text",
            value: inputStreet.value,
            onChange: inputStreet.valueChangeHandle,
            onBlur: inputStreet.inputBlurHandle,
            error: inputStreet.hasError,
            required: true,
          }}
          label={"Street"}
        />
        <Input
          input={{
            id: "postal",
            type: "text",
            value: inputPC.value,
            onChange: inputPC.valueChangeHandle,
            onBlur: inputPC.inputBlurHandle,
            error: inputPC.hasError,
            required: true,
          }}
          label={"Postal code"}
        />
        <Input
          input={{
            id: "city",
            type: "text",
            value: inputCity.value,
            onChange: inputCity.valueChangeHandle,
            onBlur: inputCity.inputBlurHandle,
            error: inputCity.hasError,
            required: true,
          }}
          label={"City"}
        />
      </div>
      <div className={styles.actions}>
        <button onClick={props.onCancel}>Cancel</button>
        <button disabled={!formIsValid}>Confirm</button>
      </div>
    </form>
  );
};
export default Checkout;
