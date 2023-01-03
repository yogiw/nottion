import { render, screen } from "@testing-library/react";
import type { RenderElementProps } from "slate-react";
import { RenderElement } from "../";

jest.mock("slate-react", () => {
  return {
    useSlateStatic: jest.fn().mockReturnValue({
      selection: {
        anchor: { path: [2, 0], offset: 6 },
        focus: { path: [2, 0], offset: 6 },
      },
    }),
    useSelected: jest.fn().mockReturnValue(true),
    ReactEditor: {
      findKey: jest.fn().mockReturnValue({ id: "1" }),
    },
  };
});

describe("Render Element", () => {
  it("should render paragraph", () => {
    const props: RenderElementProps = {
      attributes: {
        ref: null,
        "data-slate-node": "element",
      },
      element: { type: "paragraph", children: [{ text: "Hello world" }] },
      children: "Hello world",
    };

    render(<RenderElement {...props} />);
    expect(screen.getByTestId("paragraph")).toBeInTheDocument();
    expect(screen.getByTestId("paragraph")).toHaveTextContent("Hello world");
  });

  it("should render code", () => {
    const props: RenderElementProps = {
      attributes: {
        ref: null,
        "data-slate-node": "element",
      },
      element: { type: "code", children: [{ text: "Hello world" }] },
      children: "Hello world",
    };

    render(<RenderElement {...props} />);
    expect(screen.getByTestId("code")).toBeInTheDocument();
    expect(screen.getByTestId("code")).toHaveTextContent("Hello world");
  });

  it("should render quote", () => {
    const props: RenderElementProps = {
      attributes: {
        ref: null,
        "data-slate-node": "element",
      },
      element: { type: "quote", children: [{ text: "Hello world" }] },
      children: "Hello world",
    };

    render(<RenderElement {...props} />);
    expect(screen.getByTestId("quote")).toBeInTheDocument();
    expect(screen.getByTestId("quote")).toHaveTextContent("Hello world");
  });

  it("should render heading", () => {
    const props: RenderElementProps = {
      attributes: {
        ref: null,
        "data-slate-node": "element",
      },
      element: {
        type: "heading",
        children: [{ text: "Hello world" }],
        className: "font-2xl",
      },
      children: "Hello world",
    };

    render(<RenderElement {...props} />);
    expect(screen.getByTestId("heading")).toBeInTheDocument();
    expect(screen.getByTestId("heading")).toHaveTextContent("Hello world");
    expect(screen.getByTestId("heading")).toHaveClass("font-2xl");
  });

  it("should render image", () => {
    const props: RenderElementProps = {
      attributes: {
        ref: null,
        "data-slate-node": "element",
      },
      element: {
        type: "image",
        children: [{ text: "" }],
        image: "-",
      },
      children: "",
    };

    render(<RenderElement {...props} />);
    expect(screen.getByTestId("image")).toBeInTheDocument();
  });
});
