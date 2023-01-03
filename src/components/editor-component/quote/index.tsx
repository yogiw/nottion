import type { RenderElementProps } from "slate-react";

export const Quote = ({ attributes, children }: RenderElementProps) => {
  return (
    <p
      data-testid="quote"
      className="border-l-4 border-gray-800 pl-5"
      {...attributes}
    >
      {children}
    </p>
  );
};
