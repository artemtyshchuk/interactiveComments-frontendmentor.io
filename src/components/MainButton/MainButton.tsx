import styles from "./MainButton.module.scss";

interface MainButtonProps {
  disabledButton?: boolean;
  mainButtonText: string;
  onClick?: () => void;
  type: "submit" | "button";
}
export const MainButton = ({
  disabledButton,
  mainButtonText,
  onClick,
  type,
}: MainButtonProps) => {
  return (
    <button
      type={type}
      className={styles.mainButton}
      disabled={disabledButton}
      onClick={onClick}
    >
      {mainButtonText}
    </button>
  );
};
