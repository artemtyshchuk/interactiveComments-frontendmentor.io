import styles from "./AlternativeButton.module.scss";
import { ReactComponent as ReplyIcon } from "../../assets/images/icon-reply.svg";
import { ReactComponent as DeleteIcon } from "assets/images/icon-delete.svg";
import { ReactComponent as EditIcon } from "assets/images/icon-edit.svg";

interface AlternativeButtonProps {
  AlternativeButtonText: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const AlternativeButton = ({
  AlternativeButtonText,
  onClick,
}: AlternativeButtonProps) => {
  return (
    <button
      className={styles.alternativeButton}
      onClick={onClick}
      style={{
        color: AlternativeButtonText === "Delete" ? "#ED6368" : "",
      }}
    >
      {AlternativeButtonText === "Reply" && (
        <ReplyIcon className={styles.alternativeIcon} />
      )}
      {AlternativeButtonText === "Delete" && (
        <DeleteIcon style={{ paddingRight: "8px" }} />
      )}
      {AlternativeButtonText === "Edit" && (
        <EditIcon style={{ paddingRight: "8px" }} />
      )}
      {AlternativeButtonText}
    </button>
  );
};
