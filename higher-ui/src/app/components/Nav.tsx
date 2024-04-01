"use client";

import { ConnectKitButton } from "connectkit";

const Nav = () => {
  return (
    <nav className="flex flex-row justify-between items-center w-full min-h-[56px]">
      <div className="flex flex-row items-center justify-between space-x-4 w-full">
        <h1 className="font-semibold">Higher Lottery</h1>
        <ConnectKitButton theme="nouns" />
      </div>
    </nav>
  );
};

export default Nav;
