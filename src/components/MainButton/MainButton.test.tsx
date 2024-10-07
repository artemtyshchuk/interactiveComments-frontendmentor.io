import { render, screen } from "@testing-library/react";
import { MainButton } from "./MainButton";

describe("MainButton", () => {
  it("should render correctly", () => {
    render(
      <MainButton
        content="Test"
        mainButtonText="Test"
        onClick={() => {}}
        type="submit"
      />
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });
});
