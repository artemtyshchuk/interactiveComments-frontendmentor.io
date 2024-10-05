import { useEffect, useState } from "react";
import { CommentsType, DataType } from "types";

export const useFetchComments = () => {
  const [comments, setComments] = useState<CommentsType[]>([]);
  const [currentUser, setCurrentUser] = useState<DataType["currentUser"] | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/data.json");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const dataJson = (await response.json()) as DataType;
      setComments(dataJson.comments);
      setCurrentUser(dataJson.currentUser);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { comments, currentUser, error, setComments };
};
