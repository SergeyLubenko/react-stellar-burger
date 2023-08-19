import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";
import style from "./modal.module.css";
import { useEffect } from "react";

const root = document.querySelector("#root");

function Modal({ children, closePopup }) {
  useEffect(() => {
    function closePopupEsc(evt) {
      if (evt.key === "Escape") {
        closePopup();
      }
    }
    document.addEventListener("keydown", closePopupEsc);
    return () => {
      document.removeEventListener("keydown", closePopupEsc);
    };
  },[closePopup]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay closePopup={closePopup} />
      <div className={style.modal}>
        <button onClick={closePopup} className={style.btn}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </>,
    root
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closePopup: PropTypes.func.isRequired,
};

export default Modal;
