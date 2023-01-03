import { render, screen } from "@testing-library/react";
import type { RenderElementProps } from "slate-react";
import { Paragraph } from "../..";

jest.mock("slate-react", () => {
  return {
    useSlateStatic: jest
      .fn()
      .mockReturnValueOnce({
        selection: {
          anchor: { path: [2, 0], offset: 6 },
          focus: { path: [2, 0], offset: 6 },
        },
      })
      .mockReturnValueOnce({
        selection: {
          anchor: { path: [1, 0], offset: 6 },
          focus: { path: [2, 0], offset: 6 },
        },
      })
      .mockReturnValueOnce({
        selection: null,
      })
      .mockReturnValueOnce({
        selection: {
          anchor: { path: [2, 0], offset: 6 },
          focus: { path: [2, 0], offset: 6 },
        },
      }),
    useSelected: jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false),
  };
});

describe("Paragraph", () => {
  it("should render paragraph with placeholder (selected & isCollapsed)", () => {
    const props: RenderElementProps = {
      attributes: {
        ref: null,
        "data-slate-node": "element",
      },
      element: { type: "paragraph", children: [{ text: "" }] },
      children: "Hello world",
    };
    render(<Paragraph {...props} />);

    expect(screen.getByTestId("paragraph")).toBeInTheDocument();
    expect(screen.getByText("Hello world")).toBeInTheDocument();
    expect(screen.getByTestId("paragraph")).toHaveClass("placeholder");
  });

  it("should render paragraph without placeholder (selected & not collapsed)", () => {
    const props: RenderElementProps = {
      attributes: {
        ref: null,
        "data-slate-node": "element",
      },
      element: { type: "paragraph", children: [{ text: "" }] },
      children: "Hello world",
    };
    render(<Paragraph {...props} />);

    expect(screen.getByTestId("paragraph")).toBeInTheDocument();
    expect(screen.getByText("Hello world")).toBeInTheDocument();

    expect(screen.getByTestId("paragraph")).not.toHaveClass("placeholder");
  });

  it("should render paragraph without placeholder (selected & selection = null)", () => {
    const props: RenderElementProps = {
      attributes: {
        ref: null,
        "data-slate-node": "element",
      },
      element: { type: "paragraph", children: [{ text: "" }] },
      children: "Hello world",
    };
    render(<Paragraph {...props} />);

    expect(screen.getByTestId("paragraph")).toBeInTheDocument();
    expect(screen.getByText("Hello world")).toBeInTheDocument();

    expect(screen.getByTestId("paragraph")).not.toHaveClass("placeholder");
  });

  it("should render paragraph without placeholder (not selected & isCollapsed)", () => {
    const props: RenderElementProps = {
      attributes: {
        ref: null,
        "data-slate-node": "element",
      },
      element: { type: "paragraph", children: [{ text: "" }] },
      children: "Hello world",
    };
    render(<Paragraph {...props} />);

    expect(screen.getByTestId("paragraph")).toBeInTheDocument();
    expect(screen.getByText("Hello world")).toBeInTheDocument();

    expect(screen.getByTestId("paragraph")).not.toHaveClass("placeholder");
  });
});
