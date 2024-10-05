import styles from "./CommentInput.module.scss";
import React, { useState } from "react";
import { CommentsType, UserType } from "types";
import { MainButton } from "components/MainButton";
import { TextArea } from "components/TextArea";
import { usePostComment } from "hooks/usePostComment"; // импортируем хук
import { UserImage } from "components/UserImage";

interface CommentInputProps extends UserType {
  onSubmit: (newComment: CommentsType) => void;
}

export const CommentInput = ({
  image,
  onSubmit,
  username,
}: CommentInputProps) => {
  const [comment, setComment] = useState<string>("");
  const { postComment, loading, error } = usePostComment();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await postComment(comment, image, username, onSubmit);
    setComment("");
  };

  return (
    <form className={styles.commentInput} onSubmit={handleSubmit}>
      <div className={styles.userImageContainer}>
        <UserImage image={image.png} alt="userImage" inputImage />
      </div>
      <div className={styles.inputContainer}>
        <TextArea
          placeholder="Add a comment..."
          value={comment}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            setComment(event.target.value)
          }
        />
      </div>
      <div className={styles.sendButtonContainer}>
        <MainButton
          mainButtonText={loading ? "Sending..." : "Send"}
          content={comment}
          type="submit"
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};
