import type { RenderElementProps } from "slate-react";

export const Code = ({ attributes, children }: RenderElementProps) => {
  return (
    <pre data-testid="code" className="bg-slate-50 pl-5" {...attributes}>
      <code>{children}</code>
    </pre>
  );
};
