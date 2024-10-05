import { useState } from "react";
import { CommentsType, UserType } from "types";

export const usePostComment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postComment = async (
    comment: string,
    image: UserType["image"],
    username: string,
    onSubmit: (newComment: CommentsType) => void
  ) => {
    try {
      setLoading(true);
      setError(null);

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
      } else {
        setError("Failed to post comment");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { postComment, loading, error };
};
