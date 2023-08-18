import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <nav className={styles.navbar}>
        <ul className={styles.list}>
          <li className={`${styles.li} pb-4 pt-4 pl-5 pr-5`}>
            <a href="#" className={styles.link}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default">Конструктор</p>
            </a>
          </li>
          <li className={`${styles.li} pb-4 pt-4 pl-5`}>
            <a href="#" className={styles.link}>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive">
                Лента заказов
              </p>
            </a>
          </li>
          <li className={`${styles.li} pb-4 pt-4 pl-5 pr-5`}>
            <a href="#" className={styles.link}>
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive">
                Личный кабинет
              </p>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
