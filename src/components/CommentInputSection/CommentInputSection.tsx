import React, { useState } from "react";
import { CommentsType, UserType } from "types";
import { usePostComment } from "hooks/usePostComment";
import { CommentForm } from "./CommentForm";

interface CommentInputSectionProps extends UserType {
  onSubmit: (newComment: CommentsType) => void;
}

export const CommentInputSection = ({
  image,
  onSubmit,
  username,
}: CommentInputSectionProps) => {
  const [comment, setComment] = useState<string>("");
  const { postComment, loading, error } = usePostComment();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await postComment(comment, image, username, onSubmit);
    setComment("");
  };

  return (
    <>
      <CommentForm
        onSubmit={handleSubmit}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
          setComment(event.target.value)
        }
        userImage={image.png}
        value={comment}
        loading={loading}
        content={comment}
        error={error}
      />
    </>
  );
};
