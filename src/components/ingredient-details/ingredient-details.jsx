import styles from "./ingredient-details.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function IngredientDetails() {
  const { id } = useParams();

  //   const { myIngredient } = useSelector((state) => state.myIngredient);

  const { ingredients } = useSelector((state) => state.ingredients);
  if (!ingredients.length) return null;

  const { proteins, fat, carbohydrates, calories, name, image_large } =
    ingredients.find(({ _id }) => _id === id);

  return (
    <div className={styles.ingredientDetails}>
      <h2 className={`${styles.title} text text_type_main-large pb-5`}>
        Детали ингредиента
      </h2>
      <img src={image_large} alt="Изображение ингредиента"></img>
      <span className="text text_type_main-medium pt-4">{name}</span>
      <ul className={styles.list}>
        <li className={styles.li}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {calories}
          </p>
        </li>
        <li className={styles.li}>
          <p className="text text_type_main-default text_color_inactive">
            Белки,г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {proteins}
          </p>
        </li>
        <li className={styles.li}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры,г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {fat}
          </p>
        </li>
        <li className={styles.li}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы,г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;
