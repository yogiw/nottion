import { render, screen } from "@testing-library/react";
import { Draggable } from "..";

describe("Draggable", () => {
  it("should render draggable", () => {
    render(
      <Draggable id="1">
        <p>Hello World</p>
      </Draggable>
    );

    expect(screen.getByTestId("drag-button")).toBeInTheDocument();
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});
