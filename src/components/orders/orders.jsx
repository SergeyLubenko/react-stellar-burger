import styles from "./orders.module.css";
import OrderCard from "../orderCard/orderCard";

function Orders({ orders }) {
  return (
    <div className={styles.container}>
      <ul className={`custom-scroll ${styles.order_list}`}>
        {orders.map((order, key) => (
          <OrderCard key={key} order={order} />
        ))}
      </ul>
    </div>
  );
}

export default Orders;
