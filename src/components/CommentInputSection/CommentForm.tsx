import { UserImage } from "components/UserImage";
import styles from "./CommentInputSection.module.scss";
import { TextArea } from "components/TextArea";
import { MainButton } from "components/MainButton";

interface CommentFormProps {
  onSubmit: (event: React.FormEvent) => void;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  userImage: string;
  value: string;
  loading: boolean;
  content: string;
  error: string | null;
}

export const CommentForm = ({
  onSubmit,
  onChange,
  userImage,
  value,
  loading,
  content,
  error,
}: CommentFormProps) => {
  return (
    <form className={styles.commentInput} onSubmit={onSubmit}>
      <div className={styles.userImageContainer}>
        <UserImage image={userImage} alt="userImage" inputImage />
      </div>
      <div className={styles.inputContainer}>
        <TextArea
          placeholder="Add a comment..."
          value={value}
          onChange={onChange}
        />
      </div>
      <div className={styles.sendButtonContainer}>
        <MainButton
          mainButtonText={loading ? "Sending..." : "Send"}
          content={content}
          type="submit"
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};
