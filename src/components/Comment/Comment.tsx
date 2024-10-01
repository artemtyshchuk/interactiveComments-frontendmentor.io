import { CommentsType } from "types";
import styles from "./Comment.module.scss";
import { ReactComponent as ReplyIcon } from "../../assets/images/icon-reply.svg";
import { useState } from "react";

interface CommentProps extends CommentsType {}

export const Comment = ({
  score,
  user,
  createdAt,
  content,
  replies,
  replyingTo,
}: CommentProps) => {
  const { image, username } = user;

  const [scoreState, setScoreState] = useState(score);
  const [voted, setVoted] = useState(false);

  const handleVote = () => {
    if (!voted) {
      setScoreState(scoreState + 1);
      setVoted(true);
    } else {
      setScoreState(scoreState - 1);
      setVoted(false);
    }
  };

  const getFormattedContent = () => {
    return replyingTo ? (
      <div className={styles.commentText}>
        {" "}
        <span className={styles.replyingTo}>@{replyingTo}</span> {content}
      </div>
    ) : (
      <p className={styles.commentText}>{content}</p>
    );
  };

  return (
    <div className={styles.commentContainer}>
      <div className={styles.comment}>
        <div className={styles.scoreContainer}>
          <button
            className={styles.voteButton}
            onClick={handleVote}
            disabled={voted}
          >
            +
          </button>
          <p className={styles.score}>{scoreState}</p>
          <button
            className={styles.voteButton}
            onClick={handleVote}
            disabled={!voted}
          >
            -
          </button>
        </div>

        <div className={styles.headerCommentContainer}>
          <div className={styles.headerInfoContainer}>
            <img
              src={image.png}
              alt="profileImage"
              className={styles.profileImage}
            />
            <p className={styles.username}>{username}</p>
            <p className={styles.createdAt}>{createdAt}</p>
          </div>
          <div className={styles.replyButtonContainer}>
            <button className={styles.replyButton}>
              <ReplyIcon className={styles.replyIcon} />
              Reply
            </button>
          </div>
          <div className={styles.contentCommentContainer}>
            {getFormattedContent()}
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
              replyingTo={reply.replyingTo}
            />
          ))}
        </div>
      )}
    </div>
  );
};
