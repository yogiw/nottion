import { render, screen } from "@testing-library/react";
import type { RenderElementProps } from "slate-react";
import { Heading } from "../..";
describe("Heading", () => {
  it("should render heading", () => {
    const props: RenderElementProps = {
      attributes: {
        ref: null,
        "data-slate-node": "element",
      },
      element: {
        type: "heading",
        children: [{ text: "" }],
        className: "text-2xl",
      },
      children: "Hello world",
    };
    render(<Heading {...props} />);

    expect(screen.getByTestId("heading")).toHaveClass(
      props.element.className ?? "text-2xl"
    );
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });
});
