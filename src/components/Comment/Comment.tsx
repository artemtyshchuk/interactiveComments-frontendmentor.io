import { CommentsType, UserType } from "types";
import styles from "./Comment.module.scss";
import React, { useState } from "react";
import { MainButton } from "components/MainButton";
import { AlternativeButton } from "components/AlternativeButton";
import { VoteButton } from "components/VoteButton";

interface CommentProps extends CommentsType {
  currentUser: UserType;
  onDelete: (id: number) => void;
  onEdit: (id: number, comment: string) => void;
  onReply: (id: number, comment: string, replyingTo: string) => void;
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
  onReply,
}: CommentProps) => {
  const { image, username } = user;
  const { image: currentUserImage, username: currentUserUsername } =
    currentUser;

  const [scoreState, setScoreState] = useState<number>(score);
  const [voted, setVoted] = useState<boolean>(false);
  const [editedComment, setEditedComment] = useState<string>(content);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [replyMode, setReplyMode] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>("");

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

  const handleReply = () => {
    setReplyMode(!replyMode);
  };

  const handleReplySubmit = () => {
    onReply(id, replyText, username);
    setReplyMode(false);
    setReplyText("");
  };

  const handleReplyTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReplyText(event.target.value);
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
            {username === currentUserUsername && (
              <p className={styles.youFlag}>you</p>
            )}
            <p className={styles.createdAt}>{createdAt}</p>
          </div>
          <div className={styles.replyButtonContainer}>
            {username === currentUserUsername ? (
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
                  onClick={handleReply}
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
                    content={editedComment}
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

      {replyMode && (
        <div className={styles.replyInputContainer}>
          <img
            src={currentUserImage.png}
            alt="userImage"
            className={styles.profileImage}
          />
          <textarea
            className={styles.input}
            style={{ marginTop: "0px" }}
            value={replyText}
            onChange={handleReplyTextChange}
          />
          <MainButton
            type="button"
            onClick={handleReplySubmit}
            mainButtonText="Reply"
            content={replyText}
          />
        </div>
      )}

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
              replies={reply.replies}
              onDelete={handleDelete}
              onEdit={onEdit}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
};
