import { render, screen } from "@testing-library/react";
import type { CustomText } from "global";
import { Leaf } from "..";

describe("Leaf", () => {
  it("should render bold text", () => {
    const customText: CustomText = {
      bold: true,
      text: "Hello world",
    };
    render(
      <Leaf
        attributes={{ "data-slate-leaf": true }}
        text={customText}
        leaf={customText}
      >
        {customText.text}
      </Leaf>
    );

    const leaf = screen.getByTestId("leaf");
    expect(leaf).toHaveClass("font-bold");
    expect(leaf).not.toHaveClass("underline");
    expect(leaf).not.toHaveClass("italic");
  });

  it("should render italic text", () => {
    const customText: CustomText = {
      italic: true,
      text: "Hello world",
    };
    render(
      <Leaf
        attributes={{ "data-slate-leaf": true }}
        text={customText}
        leaf={customText}
      >
        {customText.text}
      </Leaf>
    );

    const leaf = screen.getByTestId("leaf");
    expect(leaf).not.toHaveClass("font-bold");
    expect(leaf).not.toHaveClass("underline");
    expect(leaf).toHaveClass("italic");
  });

  it("should render underline text", () => {
    const customText: CustomText = {
      underline: true,
      text: "Hello world",
    };
    render(
      <Leaf
        attributes={{ "data-slate-leaf": true }}
        text={customText}
        leaf={customText}
      >
        {customText.text}
      </Leaf>
    );

    const leaf = screen.getByTestId("leaf");
    expect(leaf).not.toHaveClass("font-bold");
    expect(leaf).toHaveClass("underline");
    expect(leaf).not.toHaveClass("italic");
  });
});
