import { useEffect, useState } from "react";
import styles from "./CommentsList.module.scss";
import { CommentsType, DataType } from "types";
import { Comment } from "components/Comment/Comment";
import { CommentInput } from "components/CommentInput";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

export const CommentsList = () => {
  const [comments, setComments] = useState<CommentsType[]>([]);
  const [currentUser, setCurrentUser] = useState<
    DataType["currentUser"] | null
  >(null);

  const fetchData = async () => {
    const response = await fetch("/data.json");
    const dataJson = (await response.json()) as DataType;
    setComments(dataJson.comments);
    setCurrentUser(dataJson.currentUser);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!comments.length || !currentUser) return null;

  const handleNewCommentSubmit = (newComment: CommentsType) => {
    const formattedNewComment = {
      ...newComment,
      createdAt: new Date().toISOString(),
    };

    setComments((prevComments) => [...prevComments, formattedNewComment]);
  };

  const { image, username } = currentUser;

  return (
    <div className={styles.commentsList}>
      {comments.map((comment) => {
        const createdAtDate = new Date(comment.createdAt);
        const formattedTime = !isNaN(createdAtDate.getTime())
          ? formatDistanceToNow(createdAtDate, {
              addSuffix: true,
              locale: enUS,
            })
          : comment.createdAt;

        return (
          <Comment
            key={comment.id}
            id={comment.id}
            content={comment.content}
            createdAt={formattedTime}
            score={comment.score}
            user={comment.user}
            replies={comment.replies}
          />
        );
      })}
      <div>
        <CommentInput
          image={image}
          username={username}
          onSubmit={handleNewCommentSubmit}
        />
      </div>
    </div>
  );
};
