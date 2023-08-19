import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./ingredient.module.css";
import { ingredientPropType } from "../../utils/prop-types";

const IngredientItem = ({ ingredients, current }) => {
  return (
    <>
      <li className={style.li} onClick={() => current(ingredients)}>
        <Counter
        className={style.counter}
          count={1}
          size="default"
          extraClass="m-1"
        />
        <img
          src={ingredients.image}
          alt={`Изображение ${ingredients.name}`}
        />
        <div className={`pb-2 pt-2 ${style.price}`}>
          <p className="text text_type_digits-default">
            {ingredients.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default ${style.title}`}>
          {ingredients.name}
        </p>
      </li>
    </>
  );
};

IngredientItem.propTypes = {
  ingredients: ingredientPropType.isRequired,
};

export default IngredientItem;
