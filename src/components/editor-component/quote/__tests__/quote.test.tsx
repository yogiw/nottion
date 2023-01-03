import { render, screen } from "@testing-library/react";
import type { RenderElementProps } from "slate-react";
import { Quote } from "../..";
describe("Quote", () => {
  it("should render quote", () => {
    const props: RenderElementProps = {
      attributes: {
        ref: null,
        "data-slate-node": "element",
      },
      element: { type: "quote", children: [{ text: "" }] },
      children: "Hello world",
    };
    render(<Quote {...props} />);

    expect(screen.getByTestId("quote")).toBeInTheDocument();
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });
});
