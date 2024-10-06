import { CommentsType, UserType } from "types";
import styles from "./Comment.module.scss";
import React, { useEffect, useState } from "react";
import { MainButton } from "components/MainButton";
import { VoteButton } from "components/VoteButton";
import { TextArea } from "components/TextArea";
import { UserImage } from "components/UserImage";
import { ModalDelete } from "components/ModalDelete";
import { ReplyButtons } from "./ReplyButtons";

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
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [smallScreen, setSmallScreen] = useState({
    mobileScreen: window.matchMedia("(max-width: 768px)").matches,
  });

  useEffect(() => {
    window.matchMedia("(max-width: 768px)").addEventListener("change", (e) => {
      setSmallScreen({ mobileScreen: e.matches });
    });

    return () => {
      window
        .matchMedia("(max-width: 768px)")
        .removeEventListener("change", (e) => {
          setSmallScreen({ mobileScreen: e.matches });
        });
    };
  }, []);

  const handleVote = () => {
    setScoreState((prevScore) => (voted ? prevScore - 1 : prevScore + 1));
    setVoted((prevVoted) => !prevVoted);
  };

  const handleUpdate = () => {
    onEdit(id, editedComment);
    setEditMode(false);
  };

  const handleReplySubmit = () => {
    onReply(id, replyText, username);
    setReplyMode(false);
    setReplyText("");
  };

  return (
    <div className={styles.commentContainer}>
      {modalDelete && (
        <ModalDelete
          handleCancelDelete={() => setModalDelete(false)}
          handleDelete={() => onDelete(id)}
        />
      )}
      <div className={styles.comment}>
        <div className={styles.headerContainer}>
          <div className={styles.scoreContainer}>
            <VoteButton content="+" onClick={handleVote} voted={voted} />
            <p className={styles.score}>{scoreState}</p>
            <VoteButton content="-" onClick={handleVote} voted={!voted} />
          </div>
          {smallScreen.mobileScreen && (
            <ReplyButtons
              username={username}
              currentUserUsername={currentUserUsername}
              setModalDelete={setModalDelete}
              setEditMode={setEditMode}
              setReplyMode={setReplyMode}
              editMode={editMode}
              replyMode={replyMode}
            />
          )}
        </div>

        <div className={styles.headerCommentContainer}>
          <div className={styles.headerInfoContainer}>
            <UserImage image={image.png} alt="userImage" />
            <p className={styles.username}>{username}</p>
            {username === currentUserUsername && (
              <p className={styles.youFlag}>you</p>
            )}
            <p className={styles.createdAt}>{createdAt}</p>
          </div>
          <div className={styles.replyButtonContainer}>
            <ReplyButtons
              username={username}
              currentUserUsername={currentUserUsername}
              setModalDelete={setModalDelete}
              setEditMode={setEditMode}
              setReplyMode={setReplyMode}
              editMode={editMode}
              replyMode={replyMode}
            />
          </div>

          <div className={styles.contentCommentContainer}>
            {editMode ? (
              <>
                <TextArea
                  value={editedComment}
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setEditedComment(event.target.value)
                  }
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
                <span className={styles.replyingTo}>@{replyingTo} </span>
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
          <div className={styles.userImageContainer}>
            <UserImage image={currentUserImage.png} alt="userImage" />
          </div>

          <div className={styles.inputContainer}>
            <TextArea
              value={replyText}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                setReplyText(event.target.value)
              }
              style={{ marginTop: "0px" }}
              placeholder={`Replying to @${username}...`}
            />
          </div>

          <div className={styles.sendButtonContainer}>
            <MainButton
              type="button"
              onClick={handleReplySubmit}
              mainButtonText="Reply"
              content={replyText}
            />
          </div>
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
              onDelete={onDelete}
              onEdit={onEdit}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
};
