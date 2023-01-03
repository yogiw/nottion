import clsx from "clsx";
import type { Descendant } from "slate";
import type { ElementType } from "global";
import { DndContext } from "@dnd-kit/core";
import { withHistory } from "slate-history";
import { useEffect, useMemo, useRef, useState } from "react";
import { createEditor, Editor, Range, Text, Transforms } from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";

import { Leaf } from "src/components/leaf";
import { COMMANDS, withImages } from "src/utils";
import { RenderElement } from "src/components/editor-component";

export const SlateEditor = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [target, setTarget] = useState<Range | null>(null);
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [value] = useState<Descendant[]>([
    {
      type: "paragraph",
      children: [{ text: "Nottion" }],
    },
  ]);
  const editor = useMemo(
    () => withHistory(withImages(withReact(createEditor()))),
    []
  );

  const changeType = (type: ElementType, className = "") => {
    if (editor.selection) {
      // Delete command text
      const range = Range.edges(editor.selection);

      const [start, end] = range;
      const before = Editor.before(editor, start, { unit: "word" });

      // before -> delete command word word | user types "/headi"
      // start -> delete "/" | user types "/"
      const deleteAnchor =
        before?.offset && before?.offset < start.offset ? before : start;

      Transforms.delete(editor, {
        at: {
          anchor: { ...deleteAnchor, offset: deleteAnchor.offset - 1 },
          focus: end,
        },
      });
    }

    if (type === "image") {
      Transforms.insertNodes(editor, {
        type,
        children: [{ text: "" }],
        className,
      });
    } else {
      Transforms.setNodes(editor, {
        type,
        children: [{ text: "" }],
        className,
      });
    }
  };

  const filteredCommands = useMemo(() => {
    return COMMANDS.filter((command) =>
      command.title.toLowerCase().startsWith(search)
    );
  }, [search]);

  useEffect(() => {
    if (target && filteredCommands.length > 0) {
      // Set command popup position
      const el = ref.current;
      const domRange = ReactEditor.toDOMRange(editor, target);
      const rect = domRange.getBoundingClientRect();
      if (!el) return;
      el.style.top = `${rect.top + window.pageYOffset + 24}px`;
      el.style.left = `${rect.left + window.pageXOffset}px`;
    }
  }, [filteredCommands, editor, search, target]);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={() => {
        const { selection } = editor;
        if (selection && Range.isCollapsed(selection)) {
          // isCollapsed -> Anchor = focus.
          const [start] = Range.edges(selection);
          const wordBefore = Editor.before(editor, start, { unit: "word" }); // Word before is BasePoint
          const before = wordBefore && Editor.before(editor, wordBefore);
          const beforeRange = before && Editor.range(editor, before, start);
          const beforeText = beforeRange && Editor.string(editor, beforeRange); // Word before cursor (string)
          const beforeMatch = beforeText && beforeText.match(/^\/(\w*)$/); // Check beforetext start with "/"

          const after = Editor.after(editor, start);
          const afterRange = Editor.range(editor, start, after);
          const afterText = Editor.string(editor, afterRange); // 1 char after cursor
          const afterMatch = afterText.match(/^(\s|$)/); // After text is a whitespace

          if (beforeMatch && afterMatch) {
            setTarget(beforeRange);
            setSearch(beforeMatch[1] ?? "");
            setActiveIndex(0);
            return;
          }
        }

        setTarget(null);
      }}
    >
      <DndContext
        onDragEnd={(event) => {
          const index = editor.children.findIndex(
            (element) =>
              ReactEditor.findKey(editor, element).id === event.over?.id
          );

          const activeindex = editor.children.findIndex(
            (element) =>
              ReactEditor.findKey(editor, element).id === event.active.id
          );

          Transforms.moveNodes(editor, {
            at: [activeindex],
            to: [index],
          });
        }}
      >
        <Editable
          data-testid="editable"
          renderLeaf={(props) => <Leaf {...props} />}
          renderElement={RenderElement}
          className="min-h-screen border p-4"
          onKeyDown={(event) => {
            if (target) {
              switch (event.key) {
                case "ArrowDown":
                  event.preventDefault();
                  activeIndex >= filteredCommands.length - 1
                    ? setActiveIndex(0)
                    : setActiveIndex((prev) => prev + 1);
                  break;
                case "ArrowUp":
                  event.preventDefault();
                  activeIndex <= 0
                    ? setActiveIndex(filteredCommands.length - 1)
                    : setActiveIndex((prev) => prev - 1);
                  break;
                case "Enter":
                  event.preventDefault();
                  const command = filteredCommands[activeIndex];
                  if (!command) return;
                  changeType(command.type, command.className);
                  break;
                case "Escape":
                  event.preventDefault();
                  setTarget(null);
                  setSearch("");
                  break;
              }
            }

            if (event.metaKey) {
              switch (event.key) {
                case "i": {
                  event.preventDefault();
                  Transforms.setNodes(
                    editor,
                    { italic: true },
                    { match: (n) => Text.isText(n), split: true }
                  );
                  break;
                }
                case "u": {
                  event.preventDefault();
                  Transforms.setNodes(
                    editor,
                    { underline: true },
                    { match: (n) => Text.isText(n), split: true }
                  );
                  break;
                }
                case "b": {
                  event.preventDefault();
                  Transforms.setNodes(
                    editor,
                    { bold: true },
                    { match: (n) => Text.isText(n), split: true }
                  );
                  break;
                }
              }
            }
          }}
        />
      </DndContext>

      {target && Boolean(filteredCommands.length) && (
        <div ref={ref} className="absolute rounded bg-white p-2 drop-shadow-lg">
          <ul>
            {filteredCommands.map((command, index) => (
              <li
                className={clsx(
                  "cursor-pointer rounded py-2 px-5 hover:bg-slate-200",
                  {
                    "bg-slate-200": index === activeIndex,
                  }
                )}
                key={command.title}
                onClick={() => changeType(command.type, command.className)}
              >
                {command.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Slate>
  );
};
