import styles from "./orders-page.module.css";
import Orders from "../../orders/orders";
import { NavLink } from "react-router-dom";
import { logOut } from "../../../services/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { WS_PROFILE_URL } from "../../../utils/api";
import {
  wsProfileConnect,
  wsProfileDisconnect,
} from "../../../services/actions/wsActions";
import { useEffect } from "react";

function OrdersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const accessTokenNoBearer = accessToken.slice(7);

  useEffect(() => {
    dispatch(
      wsProfileConnect(`${WS_PROFILE_URL}?token=${accessTokenNoBearer}`)
    );
    return () =>
      dispatch(
        wsProfileDisconnect(`${WS_PROFILE_URL}?token=${accessTokenNoBearer}`)
      );
  }, []);

  const { orders } = useSelector((store) => store.profileOrders);

  // Выход
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <section className={styles.section}>
      <nav className={styles.menu}>
        <NavLink
          to={"/profile"}
          className={`${styles.link} text text_type_main-medium text_color_inactive`}
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
          onClick={handleLogout}
          className={({ isActive }) =>
            isActive
              ? `${styles.link} text text_type_main-medium ${styles.link_active}`
              : `${styles.link} text text_type_main-medium text_color_inactive`
          }
        >
          Выход
        </NavLink>
        <div className="text text_type_main-small text_color_inactive pt-20">
          В этом разделе вы можете просмотреть свою историю заказов
        </div>
      </nav>
      <Orders orders={orders} />
    </section>
  );
}

export default OrdersPage;
