import style from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo, useCallback } from "react";
import DraggableIngredient from "../draggable-ingredient/draggable-ingredient";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details ";
import { useSelector, useDispatch } from "react-redux";
import { orderModal , submit} from "../../services/orderSlice";
import { v4 as uuid } from "uuid";
import { useDrop } from "react-dnd";
import {
  addIngredient,
  clearOrder,
  updateIngredients,
} from "../../services/constructorSlice";

function BurgerConstructor() {
  const dispatch = useDispatch();

  const { ingredients, bun } = useSelector(
    (store) => store.userBurgerIngredients
  );


  const { isOpen } = useSelector((state) => state.order);

  const cart = { ingredients, bun };

  const handleOpenModal = async () => {
    await dispatch(submit(cart));
  };

  const handleCloseModal = () => {
    dispatch(orderModal());
    dispatch(clearOrder());
  };

  const isDisabled = useMemo(
    () => cart.bun === null || cart.ingredients.length === 0,
    [cart]
  );

  //Функция подсчета цены
  const price = useMemo(() => {
    if (cart.bun !== null) {
      const bunPrice = cart.bun.price;
      const ingredientsPrice = cart.ingredients.reduce(
        (total, item) => total + item.price,
        0
      );
      return bunPrice * 2 + ingredientsPrice;
    } else {
      return 0;
    }
  }, [cart.bun, cart.ingredients]);

  const [{ isActive }, dropTarget] = useDrop({
    accept: "item",
    collect: (monitor) => ({
      isActive: monitor.isOver(),
    }),
    drop: (item) => {
      dispatch(
        addIngredient({
          ...item,
          id: uuid(),
        })
      );
    },
  });

  // Сортировка ингредиентов при перетаскивании
  const sortingItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = ingredients[dragIndex];
      const newOrder = [...ingredients];
      newOrder.splice(dragIndex, 1);
      newOrder.splice(hoverIndex, 0, dragItem);
      dispatch(updateIngredients(newOrder));
    },
    [ingredients, dispatch]
  );

  return (
    <>
      <section
        className={` ${style.burgerConstructor} pt-5 pl-4 pr-4`}
        ref={dropTarget}
      >
        <div className={` ${style.buns} pb-5 pr-7`}>
          {bun && (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
              bun={bun}
            />
          )}
        </div>
        <div className={`custom-scroll thin_scroll ${style.scroll}`}>
          <ul className={style.list}>
            {ingredients.map((item) => (
              <li key={item.id}>
                <DraggableIngredient
                  item={item}
                  sortingItem={sortingItem}
                  key={item.id}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className={` ${style.buns} pb-5 pr-7 pt-5`}>
          {bun && (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
              bun={bun}
            />
          )}
        </div>
        <div className={`pt-10 pr-8 ${style.order}`}>
          <div className={style.price}>
            <p className="text text_type_digits-medium pr-2">{price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={handleOpenModal}
            disabled={isDisabled}
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
    </>
  );
}

export default BurgerConstructor;
