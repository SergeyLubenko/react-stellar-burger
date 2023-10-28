import IngredientDetails from "../../ingredient-details/ingredient-details";
import styles from "./ingredient-page.module.css";

function IngredientPage() {
  return (
    <section className={styles.section}>
      <IngredientDetails />
    </section>
  );
}

export default IngredientPage;
