import styles from "./order-details.module.css";
import img from "../../images/img.svg";
import { useSelector } from "react-redux";

function OrderDetails() {
  const { number } = useSelector((store) => store.order);

  return (
    <>
      <ul className={styles.orderDetails}>
        <li className={styles.li}>
          <p className={`${styles.number} text text_type_digits-large pb-5`}>
            {number}
          </p>
          <p className="text text_type_main-medium pt-3">
            идентификатор заказа
          </p>
        </li>
        <li className={styles.li}>
          <img src={img} alt="Иконка с галочкой"></img>
        </li>
        <li className={styles.li}>
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
