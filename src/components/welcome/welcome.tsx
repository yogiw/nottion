import clsx from "clsx";
import { useState } from "react";

export const Welcome = () => {
  const [isShow, setShow] = useState(true);
  return (
    <div
      className={clsx(
        "fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-black bg-opacity-40",
        {
          hidden: !isShow,
        }
      )}
    >
      <div className="rounded bg-white p-5 shadow-md">
        <h3 className="text-xl font-bold">Nottion - Notion Clone</h3>

        <div className="mt-8 flex gap-10">
          <section>
            <p className="font-bold">Shortcut</p>
            <p>CMD + b → Bold</p>
            <p>CMD + i → Italic</p>
            <p>CMD + u → Underline</p>
          </section>

          <section>
            <p className="font-bold">Commands</p>
            <p>Heading 1</p>
            <p>Heading 2</p>
            <p>Heading 3</p>
            <p>Paragraph</p>
            <p>Image</p>
            <p>Code</p>
            <p>Quote</p>
            <p className="mt-2 italic">Type &apos;/&apos; to show commands.</p>
          </section>
        </div>
        <footer className="mt-8 flex justify-end">
          <button
            className="rounded bg-black py-1 px-8 text-white hover:bg-gray-700"
            onClick={() => setShow((prev) => !prev)}
          >
            OK!
          </button>
        </footer>
      </div>
    </div>
  );
};
