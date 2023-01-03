import React from "react";
import { useDroppable } from "@dnd-kit/core";
import clsx from "clsx";

type Props = {
  id: string;
  children: React.ReactElement;
};

export function Droppable(props: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <div
      data-testid="droppable"
      ref={setNodeRef}
      className={clsx("border-sky-200", { "border-t-2": isOver })}
    >
      {props.children}
    </div>
  );
}
