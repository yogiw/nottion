import clsx from "clsx";
import { Range } from "slate";
import { useSelected, useSlateStatic } from "slate-react";
import type { RenderElementProps } from "slate-react";
import { useMemo } from "react";

export const Paragraph = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  const editor = useSlateStatic();
  const isSelected = useSelected();

  const isCollapsed = useMemo(() => {
    if (!editor.selection) return false;
    return Range.isCollapsed(editor.selection);
  }, [editor.selection]);

  return (
    <p
      data-testid="paragraph"
      {...attributes}
      className={clsx("relative", {
        placeholder:
          isSelected && element.children?.[0]?.text === "" && isCollapsed,
      })}
    >
      {children}
    </p>
  );
};
