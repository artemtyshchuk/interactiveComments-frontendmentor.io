import { Comment } from "./Comment";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { CommentsType, UserType } from "types";
import "@testing-library/jest-dom/extend-expect";
import { AlternativeButton } from "components/AlternativeButton";

const mockMatchMedia = (matches: boolean) =>
  jest.fn().mockImplementation((query) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: jest.fn((event, callback) => {
      if (event === "change") {
        callback({ matches });
      }
    }),
    removeEventListener: jest.fn(),
  }));

const mockComment: CommentsType = {
  id: 1,
  score: 12,
  user: {
    image: {
      png: "user-image.png",
      webp: "",
    },
    username: "testUser",
  },
  createdAt: "1 day ago",
  content: "This is a test comment",
  replies: [],
  replyingTo: "",
};

const currentUser: UserType = {
  image: {
    png: "current-user-image.png",
    webp: "",
  },
  username: "currentUser",
};

const mockReplies: CommentsType[] = [
  {
    id: 2,
    score: 5,
    user: {
      image: {
        png: "reply-user-image.png",
        webp: "",
      },
      username: "replyUser",
    },
    createdAt: "2 hours ago",
    content: "This is a reply",
    replies: [],
    replyingTo: "testUser",
  },
];

describe("Comment Component", () => {
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();
  const mockOnReply = jest.fn();

  beforeEach(() => {
    window.matchMedia = mockMatchMedia(false);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render the comment with score, user details, and content", () => {
    render(
      <Comment
        {...mockComment}
        currentUser={currentUser}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        onReply={mockOnReply}
      />
    );

    expect(screen.getByText("testUser")).toBeInTheDocument();
    expect(screen.getByText("This is a test comment")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("1 day ago")).toBeInTheDocument();
  });

  it("should allow voting and toggle the vote state", () => {
    render(
      <Comment
        {...mockComment}
        currentUser={currentUser}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        onReply={mockOnReply}
      />
    );

    const upvoteButton = screen.getByText("+");
    fireEvent.click(upvoteButton);

    expect(screen.getByText("13")).toBeInTheDocument();
  });

  it("should show edit mode when edit button is clicked", () => {
    render(
      <Comment
        {...mockComment}
        currentUser={currentUser}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        onReply={mockOnReply}
      />
    );

    render(
      <AlternativeButton AlternativeButtonText="Edit" onClick={() => {}} />
    );

    const editButton = screen.getByRole("button", { name: /edit/i });
    fireEvent.click(editButton);

    expect(screen.getByText("This is a test comment")).toBeInTheDocument();
  });

  it("should show reply mode when reply button is clicked", () => {
    render(
      <Comment
        {...mockComment}
        currentUser={currentUser}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        onReply={mockOnReply}
      />
    );

    const replyButton = screen.getByText("Reply");
    fireEvent.click(replyButton);

    expect(
      screen.getByPlaceholderText("Replying to @testUser...")
    ).toBeInTheDocument();
  });

  it("should call onReply with the reply text when reply button is clicked", () => {
    render(
      <Comment
        {...mockComment}
        currentUser={currentUser}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        onReply={mockOnReply}
      />
    );

    fireEvent.click(screen.getByText("Reply"));

    const replyTextArea = screen.getByPlaceholderText(
      "Replying to @testUser..."
    );
    fireEvent.change(replyTextArea, { target: { value: "This is a reply" } });

    render(
      <AlternativeButton AlternativeButtonText="Reply" onClick={() => {}} />
    );

    const replyButton = screen.getByRole("button", { name: "Reply" });
    fireEvent.click(replyButton);

    expect(mockOnReply).toHaveBeenCalledWith(
      mockComment.id,
      "This is a reply",
      "testUser"
    );
  });

  it("should call onDelete when delete button is clicked", () => {
    render(
      <Comment
        {...mockComment}
        currentUser={currentUser}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        onReply={mockOnReply}
      />
    );

    render(
      <AlternativeButton AlternativeButtonText="Delete" onClick={() => {}} />
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);
  });

  it("should render replies when they are present", () => {
    render(
      <Comment
        {...{ ...mockComment, replies: mockReplies }}
        currentUser={currentUser}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        onReply={mockOnReply}
      />
    );

    expect(screen.getByText("This is a reply")).toBeInTheDocument();
    expect(screen.getByText("replyUser")).toBeInTheDocument();
    expect(screen.getByText("2 hours ago")).toBeInTheDocument();
  });
});
