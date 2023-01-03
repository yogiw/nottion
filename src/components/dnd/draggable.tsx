import React from "react";
import { useDraggable } from "@dnd-kit/core";
import clsx from "clsx";

type Props = {
  id: string;
  children: React.ReactElement;
};

export function Draggable(props: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: props.id,
    });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      data-testid="draggable"
      ref={setNodeRef}
      style={style}
      className={clsx("drag-item relative flex items-center", {
        "z-20": isDragging,
      })}
    >
      <button
        data-testid="drag-button"
        {...listeners}
        {...attributes}
        className={clsx("drag-icon mr-2 cursor-grab")}
      >
        ⠿
      </button>
      <div className="flex-1">{props.children}</div>
    </div>
  );
}
