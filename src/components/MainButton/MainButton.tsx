import styles from "./MainButton.module.scss";

interface MainButtonProps {
  content: string;
  mainButtonText: string;
  onClick?: () => void;
  type: "submit" | "button";
}
export const MainButton = ({
  mainButtonText,
  onClick,
  type,
  content
}: MainButtonProps) => {

  const disabledButton = !content || content.length < 5;


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
