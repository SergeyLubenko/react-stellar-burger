import styles from "./feedList.module.css";
import FeedCard from "../feedCard/feedCard";

function FeedList({ orders }) {
  return (
    <section className={styles.section}>
      <h2 className="pb-5 pl-3 text text_type_main-large">Лента Заказов</h2>
      <ul className={`custom-scroll ${styles.order_list}`}>
        {orders.map((order, key) => (
          <FeedCard key={key} order={order} />
        ))}
      </ul>
    </section>
  );
}

export default FeedList;
