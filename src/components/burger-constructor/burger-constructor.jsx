import style from "./burger-constructor.module.css";
import {
  DragIcon,
  CurrencyIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import { useState, useMemo } from "react";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details ";

function BurgerConstructor({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const bun = data.find((item) => item.type === "bun");
  const myIngredient = data.filter((item) => item.type !== "bun");

  const price = useMemo(() => {
    return data.reduce((total, item) => total + item.price, 0);
  }, [data]);

  return (
    <section className={` ${style.burgerConstructor} pt-5 pl-4 pr-4`}>
      {data.length > 0 && (
        <>
          <div className={` ${style.buns} pb-5 pr-6`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
          <div className={`custom-scroll  ${style.scroll}`}>
            <ul className={style.list}>
              {myIngredient.map(
                (item) =>
                  item.type !== "bun" && (
                    <li className={style.li} key={item._id}>
                      <DragIcon type="primary" />
                      <ConstructorElement
                        sLocked={false}
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                      />
                    </li>
                  )
              )}
            </ul>
          </div>
          <div className={` ${style.buns} pb-5 pr-7 pt-5`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        </>
      )}

      <div className={`pt-10 pr-8 ${style.order}`}>
        <div className={style.price}>
          <p className="text text_type_digits-medium ">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOpenModal}
        >
          Оформить заказ
        </Button>
        {isOpen && (
          <Modal closePopup={handleCloseModal}>
            <OrderDetails />
          </Modal>
        )}
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerConstructor;
