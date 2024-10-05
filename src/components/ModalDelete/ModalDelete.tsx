import { createPortal } from "react-dom";
import styles from "./ModalDelete.module.scss";

interface ModalDeleteProps {
  handleCancelDelete: () => void;
  handleDelete: () => void;
}

export const ModalDelete = ({handleCancelDelete, handleDelete}: ModalDeleteProps) => {
  return createPortal(
    <div className={styles.ModalDelete}>
      <div className={styles.ModalDeleteContainer}>
        <p className={styles.title}>Delete comment</p>
        <p className={styles.text}>
          Are you sure you want to delete this comment? This will remove the
          comment and can’t be undone.
        </p>
        <div className={styles.buttonsContainer}>
          <button
            className={styles.modalButton}
            style={{ backgroundColor: "#67727E" }}
            onClick={handleCancelDelete}
          >
            NO, CANCEL
          </button>
          <button className={styles.modalButton} onClick={handleDelete}>YES, DELETE</button>
        </div>
      </div>
    </div>,
    document.getElementById("modal") as HTMLElement
  );
};
