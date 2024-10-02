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

  const handleCommentDelete = (id: number) => {
    const deleteContent = (comments: CommentsType[]): CommentsType[] => {
      return comments
        .filter((comment) => comment.id !== id)
        .map((comment) => ({
          ...comment,
          replies: deleteContent(comment.replies || []),
        }));
    };
    const updateComments = deleteContent(comments);
    setComments(updateComments);
  };

  const handleCommentEdit = (id: number, updatedComment: string) => {
    const editComment = (comments: CommentsType[]): CommentsType[] => {
      return comments.map((comment) => {
        if (comment.id === id) {
          return { ...comment, content: updatedComment };
        }
        return { ...comment, replies: editComment(comment.replies || []) };
      });
    };
    const updateComments = editComment(comments);
    setComments(updateComments);
  };

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
            currentUser={currentUser.username}
            replies={comment.replies}
            onDelete={handleCommentDelete}
            onEdit={handleCommentEdit}
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
