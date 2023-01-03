import { render, screen } from "@testing-library/react";
import { withDraggable } from "..";
describe("withDraggable", () => {
  it("should render draggable", () => {
    const children = () => <p>hello world</p>;
    const draggable = withDraggable("1", {
      attributes: {
        ref: null,
        "data-slate-node": "element",
      },
      children: "",
      element: { type: "paragraph", children: [{ text: "" }] },
    });
    const childrenWithDraggable = draggable(children);
    render(childrenWithDraggable);

    expect(screen.getByText("hello world")).toBeInTheDocument();
    expect(screen.getByTestId("drag-button")).toBeInTheDocument();
    expect(screen.getByTestId("draggable")).toBeInTheDocument();
    expect(screen.getByTestId("droppable")).toBeInTheDocument();
  });
});
