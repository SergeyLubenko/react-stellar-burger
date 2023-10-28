import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { NavLink, useMatch, Link } from "react-router-dom";

function AppHeader() {
  const home = useMatch("/");
  const list = useMatch("/feed");
  const profile = useMatch("/profile");

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <nav className={styles.navbar}>
        <ul className={styles.list}>
          <li className={`${styles.li} pb-4 pt-4 pl-5 pr-5`}>
            <NavLink
              end
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? `${styles.link} text text_type_main-default ${styles.link_active}`
                  : `${styles.link} text text_type_main-default text_color_inactive`
              }
            >
              <BurgerIcon type={home ? "primary" : "secondary"} />
              Конструктор
            </NavLink>
          </li>
          <li className={`${styles.li} pb-4 pt-4 pl-5`}>
            <NavLink
              to={"/feed"}
              className={({ isActive }) =>
                isActive
                  ? `${styles.link} text text_type_main-default ${styles.link_active}`
                  : `${styles.link} text text_type_main-default text_color_inactive`
              }
            >
              <ListIcon type={list ? "primary" : "secondary"} />
              Лента заказов
            </NavLink>
          </li>
          <li className={`${styles.li} pb-4 pt-4 pl-5 pr-5`}>
            <NavLink
              end
              to={"/profile"}
              className={({ isActive }) =>
                isActive
                  ? `${styles.link} text text_type_main-default ${styles.link_active}`
                  : `${styles.link} text text_type_main-default text_color_inactive`
              }
            >
              <ProfileIcon type={profile ? "primary" : "secondary"} />
              Личный кабинет
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
