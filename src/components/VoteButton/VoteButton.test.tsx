import { fireEvent, render, screen } from "@testing-library/react";
import { VoteButton } from "./VoteButton";

describe("VoteButton", () => {
  it("should render correctly", () => {
    render(<VoteButton content="+" onClick={() => {}} voted={false} />);

    expect(screen.getByText("+")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();

    fireEvent.click(screen.getByText("+"));
    expect(screen.getByText("+")).toHaveClass("voted");
  });
});
