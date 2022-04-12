import React from "react";
import styles from './Header.module.css';
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
          <h1>ReactMeals</h1>
          <HeaderCartButton onOpenCart={props.onOpenCart}/>
      </header>
      <div className={styles['main-image']}>
          <img src="https://raw.githubusercontent.com/academind/react-complete-guide-code/11-practice-food-order-app/extra-files/meals.jpg"></img>
      </div>
    </React.Fragment>
  );
};
export default Header;