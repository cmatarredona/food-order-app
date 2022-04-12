import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const openCartHandle = () => {
    setCartIsShown(true);
  };
  const closeCartHandle = () => {
    setCartIsShown(false);
  };
  const order = () => {
    closeCartHandle();
    console.log("Ordering...");
  };
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={closeCartHandle} onAccept={order} />}
      <Header onOpenCart={openCartHandle} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
