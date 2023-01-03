import { render, screen } from "@testing-library/react";
import { Droppable } from "..";

describe("Droppable", () => {
  it("should render droppable", () => {
    render(
      <Droppable id="1">
        <p>Hello World</p>
      </Droppable>
    );

    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});
