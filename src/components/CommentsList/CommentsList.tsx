import styles from "./CommentsList.module.scss";
import { Comment } from "components/Comment/Comment";
import { CommentInput } from "components/CommentInput";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { useFetchComments } from "hooks/useFetchComments";
import { useCallback } from "react";
import { CommentsType } from "types";

export const CommentsList = () => {
  const { comments, currentUser, setComments } = useFetchComments();

  const formatCreatedAt = (dateString: string): string => {
    const createdAtDate = new Date(dateString);
    return !isNaN(createdAtDate.getTime())
      ? formatDistanceToNow(createdAtDate, {
          addSuffix: true,
          locale: enUS,
        })
      : dateString;
  };

  const formatReplies = (replies: CommentsType[]): CommentsType[] => {
    return replies.map((reply) => ({
      ...reply,
      createdAt: formatCreatedAt(reply.createdAt),
      replies: formatReplies(reply.replies || []),
    }));
  };

  const handleNewCommentSubmit = useCallback(
    (newComment: CommentsType) => {
      const formattedNewComment = {
        ...newComment,
        createdAt: new Date().toISOString(),
      };
      setComments((prevComments) => [...prevComments, formattedNewComment]);
    },
    [setComments]
  );

  const handleCommentDelete = useCallback(
    (id: number) => {
      const deleteContent = (comments: CommentsType[]): CommentsType[] => {
        return comments
          .filter((comment) => comment.id !== id)
          .map((comment) => ({
            ...comment,
            replies: deleteContent(comment.replies || []),
          }));
      };
      const updatedComments = deleteContent(comments);
      setComments(updatedComments);
    },
    [comments, setComments]
  );

  const handleCommentEdit = useCallback(
    (id: number, updatedComment: string) => {
      const editComment = (comments: CommentsType[]): CommentsType[] => {
        return comments.map((comment) => {
          if (comment.id === id) {
            return { ...comment, content: updatedComment };
          }
          return { ...comment, replies: editComment(comment.replies || []) };
        });
      };
      const updatedComments = editComment(comments);
      setComments(updatedComments);
    },
    [comments, setComments]
  );

  if (!comments.length || !currentUser) return null;

  const handleReply = (
    commentId: number,
    replyText: string,
    replyingTo: string
  ) => {
    const addReply = (comments: CommentsType[]): CommentsType[] => {
      return comments.map((comment) => {
        if (comment.id === commentId) {
          const newReply: CommentsType = {
            id: Date.now(),
            content: replyText,
            createdAt: new Date().toISOString(),
            score: 0,
            replyingTo: replyingTo,
            user: currentUser,
            replies: [],
          };
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          };
        }

        return {
          ...comment,
          replies: addReply(comment.replies || []),
        };
      });
    };

    const updatedComments = addReply(comments);
    setComments(updatedComments);
  };

  return (
    <div className={styles.commentsList}>
      {comments.map((comment) => {
        const formattedComment = {
          ...comment,
          createdAt: formatCreatedAt(comment.createdAt),
          replies: formatReplies(comment.replies || []),
        };

        return (
          <Comment
            key={formattedComment.id}
            id={formattedComment.id}
            content={formattedComment.content}
            createdAt={formattedComment.createdAt}
            score={formattedComment.score}
            user={formattedComment.user}
            currentUser={currentUser}
            replies={formattedComment.replies}
            onDelete={handleCommentDelete}
            onEdit={handleCommentEdit}
            onReply={handleReply}
          />
        );
      })}
      <div>
        <CommentInput
          image={currentUser.image}
          username={currentUser.username}
          onSubmit={handleNewCommentSubmit}
        />
      </div>
    </div>
  );
};
