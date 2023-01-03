import clsx from "clsx";
import type { RenderElementProps } from "slate-react";

export const Heading = (props: RenderElementProps) => {
  return (
    <h1
      data-testid="heading"
      className={clsx("font-bold", props.element.className)}
      {...props}
    />
  );
};
