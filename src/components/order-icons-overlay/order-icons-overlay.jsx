import styles from "./order-icons-overlay.module.css";

function IconsOverlay({ orderIngredients }) {
  return (
    <div
      className={styles.img}
      style={{ backgroundImage: `url('${orderIngredients[5]?.image_mobile}')` }}
    >
      <div className={styles.overlay}>{`+${orderIngredients.length - 5}`}</div>
    </div>
  );
}

export default IconsOverlay;
