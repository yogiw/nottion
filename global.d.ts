import type { BaseEditor } from "slate";
import type { ReactEditor } from "slate-react";
import type { HistoryEditor } from "slate-history";

type ElementType = "paragraph" | "heading" | "image" | "code" | "quote";

type CustomText = {
  text: string;
  bold?: true;
  italic?: true;
  underline?: true;
};

type ParagraphElement = {
  type: "paragraph";
  children: CustomText[];
  className?: string;
};

type HeadingElement = {
  type: "heading";
  children: CustomText[];
  className?: string;
};

type ImageElement = {
  type: "image";
  children: CustomText[];
  className?: string;
  image?: string;
};

type CodeElement = {
  type: "code";
  children: CustomText[];
  className?: string;
};

type QuoteElement = {
  type: "quote";
  children: CustomText[];
  className?: string;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element:
      | ParagraphElement
      | HeadingElement
      | ImageElement
      | CodeElement
      | QuoteElement;
    Text: CustomText;
  }
}
