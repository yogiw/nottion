import type { NextPage } from "next";
import { SlateEditor } from "src/components/editor";
import { Welcome } from "src/components/welcome";

const Home: NextPage = () => {
  return (
    <main className="container mx-auto min-h-screen py-4">
      <SlateEditor />
      <Welcome />
    </main>
  );
};

export default Home;
