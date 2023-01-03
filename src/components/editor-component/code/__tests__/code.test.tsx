import { render, screen } from "@testing-library/react";
import type { RenderElementProps } from "slate-react";
import { Code } from "../..";
describe("Code", () => {
  it("should render code", () => {
    const props: RenderElementProps = {
      attributes: {
        ref: null,
        "data-slate-node": "element",
      },
      element: { type: "code", children: [{ text: "" }] },
      children: "Hello world",
    };
    render(<Code {...props} />);

    expect(screen.getByTestId("code")).toBeInTheDocument();
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });
});
