import { render, screen } from "@testing-library/react";
import { UserImage } from "./UserImage";

describe("UserImage", () => {
  it("should render correctly", () => {
    render(<UserImage image="image" alt="alt" />);

    expect(screen.getByAltText("alt")).toHaveAttribute("src", "image");
    expect(screen.getByAltText("alt")).toMatchSnapshot();
  });
});
