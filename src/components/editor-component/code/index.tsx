import type { RenderElementProps } from "slate-react";

export const Code = ({ attributes, children }: RenderElementProps) => {
  return (
    <p data-testid="code" className="bg-slate-50 pl-5" {...attributes}>
      {children}
    </p>
  );
};
