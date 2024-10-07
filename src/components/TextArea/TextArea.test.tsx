import { render, screen } from "@testing-library/react";
import { TextArea } from "./TextArea";
describe("TextArea", () => {
  it("should render correctly", () => {
    render(
      <TextArea
        placeholder="test"
        onChange={() => {}}
        value="Test"
        style={{ margin: 0 }}
      />
    );

    expect(screen.getByDisplayValue("Test")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test")).toHaveStyle({ margin: 0 });
    expect(screen.getByPlaceholderText("test")).toMatchSnapshot();
  });
});
