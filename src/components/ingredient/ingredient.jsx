import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { useLocation, Link } from "react-router-dom";

const IngredientItem = ({ item, current }) => {
  const { ingredients, bun } = useSelector(
    (store) => store.userBurgerIngredients
  );
  const location = useLocation();

  const { _id, name, price, image } = item;

  const counter = [bun, ...ingredients, bun].filter(
    (i) => i?._id === _id
  ).length;

  const [{ isDrag }, dragRef] = useDrag({
    type: "item",
    item: { ...item },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <Link
      state={{ background: location }}
      to={`/ingredients/${item._id}`}
      className={styles.link}
      onClick={() => current(item)}
      ref={dragRef}
      style={{ isDrag }}
      id={_id}
    >
      <li className={styles.li}>
        {!!counter && (
          <Counter
            count={counter}
            size="default"
            className={styles.counter}
            extraClass="m-1"
          />
        )}
        <img src={image} alt={`Изображение ${name}`} />
        <div className={`pb-2 pt-2 ${styles.price}`}>
          <p className="text text_type_digits-default pr-2">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default ${styles.title}`}>{name}</p>
      </li>
    </Link>
  );
};

IngredientItem.propTypes = {
  item: ingredientPropType.isRequired,
};

export default IngredientItem;
