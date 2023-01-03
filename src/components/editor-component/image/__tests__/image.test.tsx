/* eslint-disable @typescript-eslint/ban-ts-comment */
import { fireEvent, render, screen } from "@testing-library/react";
import type { RenderElementProps } from "slate-react";
import { Image as Img } from "..";
import { useDropzone } from "react-dropzone";

jest.mock("slate-react", () => {
  return {
    useSlateStatic: jest.fn(),
    useSelected: jest.fn().mockReturnValue(true),
  };
});

jest.mock("react-dropzone");

describe("Image", () => {
  it("should render image with isDragActive = false", () => {
    const props: RenderElementProps = {
      attributes: {
        ref: null,
        "data-slate-node": "element",
      },
      element: { type: "image", children: [{ text: "" }], image: undefined },
      children: "",
    };

    const open = jest.fn();
    // @ts-ignore
    useDropzone.mockImplementation(() => ({
      isDragActive: false,
      getRootProps: jest.fn(),
      getInputProps: jest.fn(),
      open,
    }));

    render(<Img {...props} />);
    expect(screen.getByTestId("button-upload")).toBeInTheDocument();
    expect(open).toHaveBeenCalled();
  });

  it("should render image with isDragActive = true", () => {
    const props: RenderElementProps = {
      attributes: {
        ref: null,
        "data-slate-node": "element",
      },
      element: { type: "image", children: [{ text: "" }], image: undefined },
      children: "",
    };

    const open = jest.fn();
    // @ts-ignore
    useDropzone.mockImplementation(() => ({
      isDragActive: true,
      getRootProps: jest.fn(),
      getInputProps: jest.fn(),
      open,
    }));

    render(<Img {...props} />);
    expect(screen.queryByTestId("button-upload")).not.toBeInTheDocument();
    expect(screen.getByTestId("text-dropfile")).toBeInTheDocument();

    const file = new File(["file"], "ping.png", {
      type: "application/image",
    });
    fireEvent.drop(screen.getByTestId("popup-wrapper"), file);
  });

  it("should render image with preview", () => {
    const props: RenderElementProps = {
      attributes: {
        ref: null,
        "data-slate-node": "element",
      },
      element: { type: "image", children: [{ text: "" }], image: "https://" },
      children: "",
    };

    render(<Img {...props} />);
    expect(screen.getByTestId("image-preview")).toBeInTheDocument();
  });

  it("should not render when type not an image", () => {
    const props: RenderElementProps = {
      attributes: {
        ref: null,
        "data-slate-node": "element",
      },
      element: {
        type: "paragraph",
        children: [{ text: "" }],
      },
      children: "",
    };

    render(<Img {...props} />);
    expect(screen.queryByTestId("image")).not.toBeInTheDocument();
  });
});
