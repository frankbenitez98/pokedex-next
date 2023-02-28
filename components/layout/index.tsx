import Head from "next/head";
import React from "react";
import Searcher from "../ui/Searcher";
import NavBar from "./NavBar";

type Props = {
  children?: React.ReactNode;
  title?: string;
};

const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || "Pokedex"}</title>
      </Head>

      <main>
        <NavBar />
        {children}
      </main>
    </>
  );
};

export default Layout;
