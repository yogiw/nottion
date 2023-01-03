import type { Element } from "slate";
import type { ReactEditor } from "slate-react";

export const withImages = (editor: ReactEditor) => {
  const { isVoid } = editor;

  editor.isVoid = (element: Element) => {
    // When element = image return void = true, useSelected/ueFocused will be true when user clicks on the image
    return element.type === "image" ? true : isVoid(element);
  };

  return editor;
};
