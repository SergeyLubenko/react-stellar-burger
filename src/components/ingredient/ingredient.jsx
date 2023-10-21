import {
    CurrencyIcon,
    Counter,
  } from "@ya.praktikum/react-developer-burger-ui-components";
  import style from "./ingredient.module.css";
  import { ingredientPropType } from "../../utils/prop-types";
  import { useSelector } from "react-redux";
  import { useDrag } from "react-dnd";
  
  const IngredientItem = ({ item, current }) => {
  
    const { ingredients, bun } = useSelector(
      (store) => store.userBurgerIngredients
    );
  
    const { _id, name, price, image } = item;
  
    const counter = [bun, ...ingredients, bun].filter(
      (i) => i?._id === _id
    ).length;
  
    const [ , dragRef] = useDrag({
      type: "item",
      item: { ...item },
      collect: (monitor) => ({
        isDrag: monitor.isDragging(),
      }),
    });
  
    return (
      <>
        <li
          className={style.li}
          onClick={() => current(item)}
          ref={dragRef}
          id={_id}
        >
          {!!counter && (
            <Counter
              count={counter}
              size="default"
              className={style.counter}
              extraClass="m-1"
            />
          )}
          <img src={image} alt={`Изображение ${name}`} />
          <div className={`pb-2 pt-2 ${style.price}`}>
            <p className="text text_type_digits-default pr-2">{price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <p className={`text text_type_main-default ${style.title}`}>{name}</p>
        </li>
      </>
    );
  };
  
  IngredientItem.propTypes = {
    item: ingredientPropType.isRequired,
  };
  
  export default IngredientItem;
  