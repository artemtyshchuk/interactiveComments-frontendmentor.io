import { CommentsType, UserType } from "types";
import styles from "./CommentInput.module.scss";
import React, { useState } from "react";

interface CommentInputProps extends UserType {
  onSubmit: (newComment: CommentsType) => void;
}

export const CommentInput = ({
  image,
  onSubmit,
  username,
}: CommentInputProps) => {
  const [comment, setComment] = useState("");

  const fetchNewComment = async (event: React.FormEvent) => {
    try {
      event.preventDefault();

      const randomId = Math.floor(Math.random() * 1000);

      const newComment = {
        id: randomId,
        content: comment,
        createdAt: new Date().toISOString(),
        score: 0,
        user: {
          image: image,
          username: username,
        },
        replies: [],
      };

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments",
        {
          method: "POST",
          body: JSON.stringify(newComment),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        onSubmit(newComment);
        setComment("");
      } else {
        console.log("error");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const disabledButton = () => {
    if (!comment || comment.length < 5) {
      return true;
    }
  };

  return (
    <form className={styles.commentInput} onSubmit={fetchNewComment}>
      <div className={styles.userImageContainer}>
        <img src={image.png} alt="userImage" className={styles.userImage} />
      </div>
      <div className={styles.inputContainer}>
        <textarea
          placeholder="Add a comment..."
          className={styles.input}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className={styles.sendButtonContainer}>
        <button
          type="submit"
          className={styles.sendButton}
          disabled={disabledButton()}
        >
          Send
        </button>
      </div>
    </form>
  );
};
