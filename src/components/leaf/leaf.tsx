import clsx from "clsx";
import type { RenderLeafProps } from "slate-react";

export const Leaf = (props: RenderLeafProps) => {
  return (
    <span
      data-testid="leaf"
      {...props.attributes}
      className={clsx({
        underline: props.leaf.underline,
        "font-bold": props.leaf.bold,
        italic: props.leaf.italic,
      })}
    >
      {props.children}
    </span>
  );
};
