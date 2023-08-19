import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { ingredientPropType } from "../../utils/prop-types";
import IngredientItem from "../Ingredient/Ingredient";
import style from "./BurgerIngredients.module.css";
import Modal from "../Modal/Modal";
import PropTypes from "prop-types";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

function BurgerIngredients({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [myIngredient, setCurrentIngredient] = useState(null);

  const handleOpenModal = (item) => {
    setIsOpen(true);
    setCurrentIngredient(item);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setCurrentIngredient(null);
  };

  const [current, setCurrent] = useState("buns");

  const bun = data.filter((myIngredient) => myIngredient.type === "bun");
  const sauce = data.filter((myIngredient) => myIngredient.type === "sauce");
  const main = data.filter((myIngredient) => myIngredient.type === "main");

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

  return (
    <>
      <section className={style.burgerIngredients}>
        <h1 className="text text_type_main-large">Соберите бургер</h1>
        <div className={style.tab}>
          <Tab value="bun" active={current === "bun"} onClick={tabsClick}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === "sauce"} onClick={tabsClick}>
            Соусы
          </Tab>
          <Tab value="main" active={current === "main"} onClick={tabsClick}>
            Начинки
          </Tab>
        </div>
        <div className={`custom-scroll ${style.scroll_ingredients}`}>
          <h2 id="bun" className="text text_type_main-medium pt-5 pb-5">
            Булки
          </h2>
          <ul className={`${style.list} pt-5 pb-5`}>
            {bun.map((item) => (
              <IngredientItem
                key={item._id}
                ingredients={item}
                current={handleOpenModal}
              />
            ))}
          </ul>
          <h2 id="sauce" className="text text_type_main-medium pt-5 pb-5">
            Соусы
          </h2>
          <ul className={`${style.list} pt-1 pb-5`}>
            {sauce.map((item) => (
              <IngredientItem
                key={item._id}
               ingredients={item}
                current={handleOpenModal}
              />
            ))}
          </ul>
          <h2 id="main" className="text text_type_main-medium pt-5 pb-5">
            Начинки
          </h2>
          <ul className={`${style.list} pt-5 pb-5`}>
            {main.map((item) => (
              <IngredientItem
                key={item._id}
                ingredients={item}
                current={handleOpenModal}
              />
            ))}
          </ul>
        </div>
        {isOpen && (
          <Modal closePopup={handleCloseModal}>
            <IngredientDetails myIngredient={myIngredient} />
          </Modal>
        )}
      </section>
    </>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerIngredients;
