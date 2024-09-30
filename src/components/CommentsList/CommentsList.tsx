import { useEffect, useState } from "react";
import styles from "./CommentsList.module.scss";
import { CommentsType, DataType } from "types";
import { Comment } from "components/Comment/Comment";
export const CommentsList = () => {
  const [comments, setComments] = useState<CommentsType[]>([]);

  const fetchData = async () => {
    const response = await fetch("/data.json");
    const dataJson = (await response.json()) as DataType;
    setComments(dataJson.comments);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.commentsList}>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          id={comment.id}
          content={comment.content}
          createdAt={comment.createdAt}
          score={comment.score}
          user={comment.user}
        />
      ))}
    </div>
  );
};
