import styles from "./feedStats.module.css";

function FeedStats({ orders, total, totalToday }) {
  const completedOrders = orders.filter(({ status }) => {
    return status === "done";
  });

  const ongoingOrders = orders.filter(({ status }) => {
    return status !== "done";
  });

  return (
    <section className={styles.section}>
      <div className={styles.status}>
        <div className={styles.status}>
          <p className="text text_type_main-medium pb-6">Готовы:</p>
          <ul className={styles.orders_list}>
            {completedOrders.map(
              ({ number }, key) =>
                key < 4 && (
                  <li
                    key={key}
                    className={`${
                      (styles.number, styles.done)
                    } text text_type_digits-default`}
                  >
                    {number}
                  </li>
                )
            )}
          </ul>
        </div>
        <div className={styles.status}>
          <p className="text text_type_main-medium pb-6">В работе:</p>
          <ul className={styles.orders_list}>
            {ongoingOrders.map(
              ({ number }, key) =>
                key < 3 && (
                  <li
                    key={key}
                    className={`${styles.number} text text_type_digits-default`}
                  >
                    {number}
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
      <div className={styles.statistics}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <span className={`${styles.shadow} text text_type_digits-large`}>
          {total}
        </span>
      </div>
      <div className={styles.statistics}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <span className={`${styles.shadow} text text_type_digits-large`}>
          {totalToday}
        </span>
      </div>
    </section>
  );
}

export default FeedStats;
