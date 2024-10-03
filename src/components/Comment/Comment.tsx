import { CommentsType } from "types";
import styles from "./Comment.module.scss";
import { useState } from "react";
import { MainButton } from "components/MainButton";
import { AlternativeButton } from "components/AlternativeButton";
import { VoteButton } from "components/VoteButton";

interface CommentProps extends CommentsType {
  currentUser: string;
  onDelete: (id: number) => void;
  onEdit: (id: number, comment: string) => void;
}

export const Comment = ({
  id,
  score,
  user,
  createdAt,
  content,
  replies,
  replyingTo,
  currentUser,
  onDelete,
  onEdit,
}: CommentProps) => {
  const { image, username } = user;

  const [scoreState, setScoreState] = useState<number>(score);
  const [voted, setVoted] = useState<boolean>(false);
  const [editedComment, setEditedComment] = useState<string>(content);
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleVote = () => {
    if (!voted) {
      setScoreState(scoreState + 1);
      setVoted(true);
    } else {
      setScoreState(scoreState - 1);
      setVoted(false);
    }
  };

  const handleDelete = (id: number) => {
    onDelete(id);
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleUpdate = () => {
    onEdit(id, editedComment);
    setEditMode(false);
  };

  const handleEditInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditedComment(event.target.value);
  };

  return (
    <div className={styles.commentContainer}>
      <div className={styles.comment}>
        <div className={styles.scoreContainer}>
          <VoteButton content="+" onClick={handleVote} voted={voted} />
          <p className={styles.score}>{scoreState}</p>
          <VoteButton content="-" onClick={handleVote} voted={!voted} />
        </div>

        <div className={styles.headerCommentContainer}>
          <div className={styles.headerInfoContainer}>
            <img
              src={image.png}
              alt="profileImage"
              className={styles.profileImage}
            />
            <p className={styles.username}>{username}</p>
            {username === currentUser && <p className={styles.youFlag}>you</p>}
            <p className={styles.createdAt}>{createdAt}</p>
          </div>
          <div className={styles.replyButtonContainer}>
            {username === currentUser ? (
              <>
                <AlternativeButton
                  AlternativeButtonText="Delete"
                  onClick={() => handleDelete(id)}
                />

                <AlternativeButton
                  AlternativeButtonText="Edit"
                  onClick={handleEdit}
                />
              </>
            ) : (
              <>
                <AlternativeButton
                  AlternativeButtonText="Reply"
                  onClick={() => {}}
                />
              </>
            )}
          </div>

          <div className={styles.contentCommentContainer}>
            {editMode ? (
              <>
                <textarea
                  className={styles.input}
                  value={editedComment}
                  onChange={handleEditInputChange}
                />
                <div className={styles.updateButtonContainer}>
                  <MainButton
                    type="button"
                    onClick={handleUpdate}
                    mainButtonText="Update"
                  />
                </div>
              </>
            ) : replyingTo ? (
              <div className={styles.commentText}>
                <span className={styles.replyingTo}>@{replyingTo}</span>
                {editedComment}
              </div>
            ) : (
              <p className={styles.commentText}>{editedComment}</p>
            )}
          </div>
        </div>
      </div>
      {replies && replies.length > 0 && (
        <div className={styles.repliesContainer}>
          {replies.map((reply) => (
            <Comment
              id={reply.id}
              key={reply.id}
              score={reply.score}
              user={reply.user}
              createdAt={reply.createdAt}
              content={reply.content}
              currentUser={currentUser}
              replyingTo={reply.replyingTo}
              onDelete={handleDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};
