import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://react-http-de91a-default-rtdb.firebaseio.com/meals.json'
      );
      // if (!response.ok) {
      //   throw new Error('Failed to fetch meals !');
      // }
      const mealsResponse = await response.json();

      const lodedMeals = [];
      for (const key in mealsResponse) {
        lodedMeals.push({
          id: key,
          name: mealsResponse[key].name,
          description: mealsResponse[key].description,
          price: mealsResponse[key].price
        });
      }

      setLoading(false);
      setMeals(lodedMeals);
    };
    fetchMeals().catch((error) => {
      setLoading(false);
      setError(true);
    });
  }, [])

  if (loading && !error) {    
    return (      
      <section className={classes.isLoading}>
        loading...
      </section>
    );

  }
  if (!loading && error) {    
    return (      
      <section className={classes.error}>
        <p>Failed to fetch meals !</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
    
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
