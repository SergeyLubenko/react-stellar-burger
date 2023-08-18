import style from "./OrderDetails.module.css";
import img from "../../images/img.svg";

function OrderDetails() {
  return (
    <>
      <ul className={style.orderDetails}>
        <li className={style.li}>
          <p className={`${style.number} text text_type_digits-large pb-5`}>
            034536
          </p>
          <p className="text text_type_main-medium pt-8">
            идентификатор заказа
          </p>
        </li>
        <li className={style.li}>
          <img src={img} alt="Иконка с галочкой"></img>
        </li>
        <li className={style.li}>
          <p className="text text_type_main-default">
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-default text_color_inactive pt-2">
            Дождитесь готовности на орбитальной станции
          </p>
        </li>
      </ul>
    </>
  );
}

export default OrderDetails;
