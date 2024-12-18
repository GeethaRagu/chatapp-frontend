import React from "react";
import SearchInput from "./SearchInput";
import LogoutButton from "./LogoutButton";
import Conversations from "./Conversations";

const Sidebar = () => {
  return (
    <div className="border-r border-blue-500 p-4 flex flex-col">
      <SearchInput />
      <div className="divider divider-info px-3"></div>
      <Conversations />
      
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
