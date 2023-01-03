import type { ElementType } from "global";

export const COMMANDS: ({ type: ElementType; title: string } & Record<
  string,
  string
>)[] = [
  {
    title: "Heading 1",
    type: "heading",
    className: "text-2xl",
  },
  {
    title: "Heading 2",
    type: "heading",
    className: "text-xl",
  },
  {
    title: "Heading 3",
    type: "heading",
    className: "text-lg",
  },
  {
    title: "Paragraph",
    type: "paragraph",
  },
  {
    title: "Image",
    type: "image",
  },
  {
    title: "Code",
    type: "code",
  },
  {
    title: "Quote",
    type: "quote",
  },
];
