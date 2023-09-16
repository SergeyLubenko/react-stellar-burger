import { useState, useEffect, useMemo } from "react";
import IngredientItem from "../ingredient/ingredient";
import style from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useSelector, useDispatch } from "react-redux";
import {
  addIngredient,
  hideIngredient,
} from "../../services/myIngredientSlice";
import { fetchIngredients } from "../../services/ingredientsSlice";
import { useInView } from "react-intersection-observer";

function BurgerIngredients() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const { ingredients, ingredientsError } = useSelector(
    (store) => store.ingredients
  );

  const { isOpen } = useSelector((state) => state.myIngredient);

  const handleOpenModal = (item) => {
    dispatch(addIngredient(item));
  };

  const handleCloseModal = () => {
    dispatch(hideIngredient());
  };

  //перебор ингредиентов по типу
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

  const [current, setCurrent] = useState("bun");

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
    <>
      <section className={style.burgerIngredients}>
        <h1 className="text text_type_main-large">Соберите бургер</h1>
        <div className={style.tab}>
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
        {ingredientsError ? (
          <span className={`${style.error} text text_type_main-default`}>
            Ошибка загрузки данных. Попробуйте перезагрузить страницу.
          </span>
        ) : (
          <div className={`custom-scroll ${style.scroll_ingredients}`}>
            <h2 id="bun" className="text text_type_main-medium pt-5 pb-5">
              Булки
            </h2>
            <ul className={`${style.list} pt-5 pb-5`} ref={bunTarget}>
              {bun.map((item) => (
                <IngredientItem
                  key={item._id}
                  item={item}
                  current={handleOpenModal}
                />
              ))}
            </ul>
            <h2 id="sauce" className="text text_type_main-medium pt-5 pb-5">
              Соусы
            </h2>
            <ul className={`${style.list} pt-1 pb-5`} ref={sauceTarget}>
              {sauce.map((item) => (
                <IngredientItem
                  key={item._id}
                  item={item}
                  current={handleOpenModal}
                />
              ))}
            </ul>
            <h2 id="main" className="text text_type_main-medium pt-5 pb-5">
              Начинки
            </h2>
            <ul className={`${style.list} pt-5 pb-5`} ref={mainTarget}>
              {main.map((item) => (
                <IngredientItem
                  key={item._id}
                  item={item}
                  current={handleOpenModal}
                />
              ))}
            </ul>
          </div>
        )}
        {isOpen && (
          <Modal closePopup={handleCloseModal}>
            <IngredientDetails />
          </Modal>
        )}
      </section>
    </>
  );
}

export default BurgerIngredients;
