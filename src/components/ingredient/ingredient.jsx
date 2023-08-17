import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./ingredient.module.css";
import { ingredientPropType } from "../../utils/prop-types";

const IngredientItem = ({ DataIngredients, current }) => {
  return (
    <>
      <li className={style.li} onClick={() => current(DataIngredients)}>
        <Counter
        className={style.counter}
          count={1}
          size="default"
          extraClass="m-1"
        />
        <img
          src={DataIngredients.image}
          alt={`Изображение ${DataIngredients.name}`}
        />
        <div className={`pb-2 pt-2 ${style.price}`}>
          <p className="text text_type_digits-default">
            {DataIngredients.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default ${style.title}`}>
          {DataIngredients.name}
        </p>
      </li>
    </>
  );
};

IngredientItem.propTypes = {
  DataIngredients: ingredientPropType.isRequired,
};

export default IngredientItem;
