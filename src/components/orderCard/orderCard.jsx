import styles from "./orderCard.module.css";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import IconsOverlay from "../order-icons-overlay/order-icons-overlay";

function OrderCard({ order }) {
  const location = useLocation();

  const allIngredients = useSelector((state) => state.ingredients.ingredients);

  const { name, number, createdAt, _id, ingredients, status } = order;

  const orderIngredients = useMemo(() => {
    if (ingredients) {
      return ingredients.map((id) =>
        allIngredients.find((item) => item._id === id)
      );
    }
  }, [allIngredients]);

  const price = orderIngredients.reduce((acc, i) => acc + (i?.price || 0), 0);

  const sortedIngredients = orderIngredients.slice(0, 5);

  const loadIngredientsIcons = () => {
    return sortedIngredients.map((item, i) => (
      <div
        key={i}
        className={styles.img}
        style={{ backgroundImage: `url('${item?.image_mobile}')` }}
      />
    ));
  };

  const setTextColor = () => {
    if (status === "done") {
      return `text text_type_main-default ${styles.done}`;
    } else if (status === "created") {
      return `text text_type_main-default ${styles.created}`;
    } else if (status === "pending") {
      return `text text_type_main-default ${styles.created}`;
    }
  };

  return (
    <Link
      state={{ background: location }}
      to={`/profile/orders/${_id}`}
      className={styles.link}
    >
      <li className={styles.card}>
        <div className={styles.text}>
          <span className="text text_type_digits-default">#{number}</span>
          <span className="text text_type_main-small text_color_inactive">
            <FormattedDate date={new Date(createdAt)} />
          </span>
        </div>
        <div className={styles.info}>
          <p className="text text_type_main-medium">{name}</p>
          <p className={setTextColor()}>
            {status === "done" ? "Выполнен" : "Готовится"}
          </p>
        </div>
        <div className={styles.icons}>
          <div className={styles.imgs_list}>{loadIngredientsIcons()}</div>
          {orderIngredients.length > 5 && (
            <IconsOverlay orderIngredients={orderIngredients} />
          )}
          <div className={styles.price}>
            <p className="text text_type_digits-default">{price}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </li>
    </Link>
  );
}

export default OrderCard;
