import styles from "./profile.module.css";
import { NavLink } from "react-router-dom";
import { logOut } from "../../../services/userSlice";
import UserProfile from "../../userProfile/userProfile";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Выход
  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <section className={styles.section}>
      <nav className={styles.menu}>
        <NavLink
          to={"/profile"}
          className={`${styles.link} text text_type_main-medium ${styles.link_active}`}
        >
          Профиль
        </NavLink>
        <NavLink
          to={"/profile/orders"}
          className={({ isActive }) =>
            isActive
              ? `${styles.link} text text_type_main-medium ${styles.link_active}`
              : `${styles.link} text text_type_main-medium text_color_inactive`
          }
        >
          История заказов
        </NavLink>
        <NavLink
          to={"/logout"}
          onClick={handleLogOut}
          className={({ isActive }) =>
            isActive
              ? `${styles.link} text text_type_main-medium ${styles.link_active}`
              : `${styles.link} text text_type_main-medium text_color_inactive`
          }
        >
          Выход
        </NavLink>
        <div className="text text_type_main-small text_color_inactive pt-20">
          В этом разделе вы можете изменить свои персональные данные
        </div>
      </nav>
      <UserProfile />
    </section>
  );
}

export default Profile;
