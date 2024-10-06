import { AlternativeButton } from "components/AlternativeButton";

interface ReplyButtonsProps {
  username: string;
  currentUserUsername: string;
  setModalDelete: (value: boolean) => void;
  setEditMode: (value: boolean) => void;
  setReplyMode: (value: boolean) => void;
  editMode: boolean;
  replyMode: boolean;
}

export const ReplyButtons = ({
  username,
  currentUserUsername,
  setModalDelete,
  setEditMode,
  setReplyMode,
  editMode,
  replyMode,
}: ReplyButtonsProps) => {
  return (
    <div>
      {username === currentUserUsername ? (
        <>
          <AlternativeButton
            AlternativeButtonText="Delete"
            onClick={() => setModalDelete(true)}
          />
          <AlternativeButton
            AlternativeButtonText="Edit"
            onClick={() => setEditMode(!editMode)}
          />
        </>
      ) : (
        <AlternativeButton
          AlternativeButtonText="Reply"
          onClick={() => setReplyMode(!replyMode)}
        />
      )}
    </div>
  );
};
