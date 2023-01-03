import { useEffect } from "react";
import { useSelected, useSlateStatic } from "slate-react";
import { Transforms } from "slate";
import type { RenderElementProps } from "slate-react";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";

export const Image = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  const isSelected = useSelected();
  const editor = useSlateStatic();
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: (files: File[]) => {
      if (!files[0]) return;
      const url = URL.createObjectURL(files[0]);
      Transforms.setNodes(editor, {
        type: "image",
        children: element.children,
        image: url,
      });
    },
  });

  useEffect(() => {
    if (element.type === "image" && !element.image) {
      open();
    }
  }, []);

  if (element.type !== "image") return <></>;
  return (
    <div data-testid="image" {...attributes}>
      {children}
      <div className={clsx("relative w-full")} contentEditable={false}>
        {element.image ? (
          <img
            data-testid="image-preview"
            alt="Image"
            src={element.image}
            className="w-60"
          />
        ) : (
          <p className="p-2">Add an image</p>
        )}

        {isSelected && (
          <div
            data-testid="popup-wrapper"
            {...getRootProps()}
            className="absolute z-10 min-w-[280px] rounded bg-white p-5 text-center drop-shadow-lg"
          >
            <input {...getInputProps()} type="image" />
            {isDragActive ? (
              <p data-testid="text-dropfile">Drop the file here ...</p>
            ) : (
              <button data-testid="button-upload" onClick={open}>
                Upload File
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
