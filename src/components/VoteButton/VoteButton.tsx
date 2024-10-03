import styles from "./VoteButton.module.scss";

interface VoteButtonProps {
  content: "+" | "-";
  onClick: () => void;
  voted: boolean;
}

export const VoteButton = ({ content, onClick, voted }: VoteButtonProps) => {
  return (
    <button
      className={`${styles.voteButton} ${
        content === "+" && voted && styles.voted
      }`}
      onClick={onClick}
      disabled={voted}
    >
      {content}
    </button>
  );
};
