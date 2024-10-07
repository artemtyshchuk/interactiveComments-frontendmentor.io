import { render, screen } from "@testing-library/react";
import { AlternativeButton } from "./AlternativeButton";

describe("AlternativeButton", () => {
  it("should render correctly", () => {
    render(
      <AlternativeButton AlternativeButtonText="Reply" onClick={() => {}} />
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Reply");
  });
  it('should render correctly when AlternativeButtonText is "Delete"', () => {
    render(
      <AlternativeButton AlternativeButtonText="Delete" onClick={() => {}} />
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Delete");
    expect(screen.getByRole("button")).toHaveStyle({ color: "#ED6368" });
  });
  it('should render correctly when AlternativeButtonText is "Edit"', () => {
    render(
      <AlternativeButton AlternativeButtonText="Edit" onClick={() => {}} />
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Edit");
  });
});
