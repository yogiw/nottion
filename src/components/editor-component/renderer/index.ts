import { ReactEditor, useSlateStatic } from "slate-react";
import type { RenderElementProps } from "slate-react";

import { Code, Heading, Image, Paragraph, Quote } from "..";
import { withDraggable } from "../../dnd";

export const RenderElement = (props: RenderElementProps) => {
  const editor = useSlateStatic();
  const key = ReactEditor.findKey(editor, props.element);
  const draggable = withDraggable(key.id, props);

  switch (props.element.type) {
    case "heading":
      return draggable(Heading);
    case "image":
      return draggable(Image);
    case "code":
      return draggable(Code);
    case "quote":
      return draggable(Quote);
    case "paragraph":
      return draggable(Paragraph);
    default:
      return draggable(Paragraph);
  }
};
