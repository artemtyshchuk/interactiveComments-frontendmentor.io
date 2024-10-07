import { render, screen, fireEvent } from "@testing-library/react";
import { ModalDelete } from "./ModalDelete";

const createModalContainer = () => {
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal");
  document.body.appendChild(modalRoot);
  return modalRoot;
};

describe("ModalDelete", () => {
  let modalRoot: HTMLElement;

  beforeEach(() => {
    modalRoot = createModalContainer();
  });

  afterEach(() => {
    document.body.removeChild(modalRoot);
  });

  it("should render the modal content", () => {
    render(
      <ModalDelete handleCancelDelete={jest.fn()} handleDelete={jest.fn()} />
    );

    expect(screen.getByText(/delete comment/i)).toBeInTheDocument();
    expect(
      screen.getByText(/are you sure you want to delete this comment/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/no, cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/yes, delete/i)).toBeInTheDocument();
  });

  it("should call handleCancelDelete when cancel button is clicked", () => {
    const mockCancel = jest.fn();
    render(
      <ModalDelete handleCancelDelete={mockCancel} handleDelete={jest.fn()} />
    );

    fireEvent.click(screen.getByText(/no, cancel/i));
    expect(mockCancel).toHaveBeenCalledTimes(1);
  });

  it("should call handleDelete when delete button is clicked", () => {
    const mockDelete = jest.fn();
    render(
      <ModalDelete handleCancelDelete={jest.fn()} handleDelete={mockDelete} />
    );

    fireEvent.click(screen.getByText(/yes, delete/i));
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });
});
