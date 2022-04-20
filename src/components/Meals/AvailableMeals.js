import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";
import { useEffect, useState } from "react";
const AvailableMeals = () => {
  const [availableMeals, setAvailableMeals] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();
  const fetchMealsData = () => {
    const setMeals = (mealsData) => {
      const loadedMeals = [];
      for (const key in mealsData) {
        loadedMeals.push({ id: key, ...mealsData[key] });
      }
      setAvailableMeals([...loadedMeals]);
    };
    sendRequest(
      {
        url: "https://react-course-ba89e-default-rtdb.europe-west1.firebasedatabase.app/meals.json",
      },
      setMeals
    );
  };
  useEffect(() => {
    fetchMealsData();
  }, []);
  const mealsList = availableMeals.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });
  if (isLoading){
    return (
      <section className={styles.mealsLoading}>
        <p>Loading...</p>
      </section>
    );}
  if(error){
    return(
      <section className={styles.mealsError}>
        <p>{error}</p>
      </section>
    )
  }
  return (
    <Card className={styles.meals}>
      <ul>{mealsList}</ul>
    </Card>
  );
};
export default AvailableMeals;
