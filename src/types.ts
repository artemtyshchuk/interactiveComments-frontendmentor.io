type ImageType = {
  png: string;
  webp: string;
};

export type UserType = {
  image: ImageType;
  username: string;
};

export type CommentsType = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: UserType;
  replyingTo?: string;
  replies?: CommentsType[];
};

export type DataType = {
  currentUser: UserType;
  comments: CommentsType[];
};
