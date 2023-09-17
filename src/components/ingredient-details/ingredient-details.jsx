import style from "./ingredient-details.module.css";
import { useSelector } from "react-redux";

function IngredientDetails() {
  const { myIngredient } = useSelector((state) => state.myIngredient);

  return (
    <>
      <div className={style.ingredientDetails}>
        <h2 className={`${style.title} text text_type_main-large pb-5`}>
          Детали ингредиента
        </h2>
        <img
          src={myIngredient.image_large}
          alt="Изображение ингредиента"
        ></img>
        <span className="text text_type_main-medium pt-4">
          {myIngredient.name}
        </span>
        <ul className={style.list}>
          <li className={style.li}>
            <p className="text text_type_main-default text_color_inactive">
              Калории,ккал
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {myIngredient.calories}
            </p>
          </li>
          <li className={style.li}>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {myIngredient.proteins}
            </p>
          </li>
          <li className={style.li}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {myIngredient.fat}
            </p>
          </li>
          <li className={style.li}>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {myIngredient.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default IngredientDetails;
