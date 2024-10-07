import { render, screen } from "@testing-library/react";
import { CommentInputSection } from "./CommentInputSection";

describe("CommentInputSection", () => {
  it("should render correctly", () => {
    render(
      <CommentInputSection
        onSubmit={() => {}}
        username={"username"}
        image={{ png: "", webp: "" }}
      />
    );

    expect(screen.getByRole("img")).toMatchSnapshot();
  });
});
