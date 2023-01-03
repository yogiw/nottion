import type { RenderElementProps } from "slate-react";
import { Draggable } from "./draggable";
import { Droppable } from "./droppable";

export const withDraggable = (id: string, props: RenderElementProps) => {
  const WithDraggable = (
    Children: (props: RenderElementProps) => React.ReactElement
  ) => {
    return (
      <Droppable id={id}>
        <Draggable id={id}>
          <Children {...props} />
        </Draggable>
      </Droppable>
    );
  };

  return WithDraggable;
};
