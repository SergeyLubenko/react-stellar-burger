import { useState, useMemo } from "react";
import Ingredient from "../ingredient/ingredient";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { addIngredient } from "../../services/myIngredientSlice";
import { useInView } from "react-intersection-observer";

function BurgerIngredients() {
  const dispatch = useDispatch();

  const { ingredients, error } = useSelector((store) => store.ingredients);

  const handleOpenModal = (item) => {
    dispatch(addIngredient(item));
  };

  const bun = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === "bun"),
    [ingredients]
  );
  const sauce = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === "sauce"),
    [ingredients]
  );
  const main = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === "main"),
    [ingredients]
  );

  const [, setCurrent] = useState("bun");

  //Элементы табов по ID
  const tabs = {
    bun: document.querySelector("#bun"),
    sauce: document.querySelector("#sauce"),
    main: document.querySelector("#main"),
  };

  //клику на табы
  const tabsClick = (item) => {
    setCurrent(item);
    if (item) tabs[item].scrollIntoView({ behavior: "auto" });
  };

  const [bunTarget, bunInView] = useInView({ threshold: 0 });
  const [sauceTarget, sauceInView] = useInView({ threshold: 0.7 });
  const [mainTarget, mainInView] = useInView({ threshold: 0.3 });

  return (
    <section className={styles.burgerIngredients}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={styles.tab}>
        <Tab value="bun" active={bunInView === true} onClick={tabsClick}>
          Булки
        </Tab>
        <Tab value="sauce" active={sauceInView === true} onClick={tabsClick}>
          Соусы
        </Tab>
        <Tab value="main" active={mainInView === true} onClick={tabsClick}>
          Начинки
        </Tab>
      </div>
      {error ? (
        <span className={`${styles.error} text text_type_main-default`}>
          Ошибка загрузки данных. Попробуйте перезагрузить страницу.
        </span>
      ) : (
        <div className={`custom-scroll ${styles.scroll_ingredients}`}>
          <h2 id="bun" className="text text_type_main-medium pt-5 pb-5">
            Булки
          </h2>
          <ul className={`${styles.list} pt-5 pb-5`} ref={bunTarget}>
            {bun.map((item) => (
              <Ingredient
                key={item._id}
                item={item}
                current={handleOpenModal}
              />
            ))}
          </ul>
          <h2 id="sauce" className="text text_type_main-medium pt-5 pb-5">
            Соусы
          </h2>
          <ul className={`${styles.list} pt-1 pb-5`} ref={sauceTarget}>
            {sauce.map((item) => (
              <Ingredient
                key={item._id}
                item={item}
                current={handleOpenModal}
              />
            ))}
          </ul>
          <h2 id="main" className="text text_type_main-medium pt-5 pb-5">
            Начинки
          </h2>
          <ul className={`${styles.list} pt-5 pb-5`} ref={mainTarget}>
            {main.map((item) => (
              <Ingredient
                key={item._id}
                item={item}
                current={handleOpenModal}
              />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default BurgerIngredients;
