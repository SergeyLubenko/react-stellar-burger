import style from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay({ closePopup }) {
  return <div onClick={closePopup} className={style.overlay}></div>;
}

ModalOverlay.propTypes = {
  closePopup: PropTypes.func.isRequired,
};

export default ModalOverlay;
