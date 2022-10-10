import React from "react";
import { RiSearchLine } from "react-icons/ri";
import { BiDotsVerticalRounded } from "react-icons/bi";

export default function SearchUser() {
  return (
    <div className="search-user">
      <RiSearchLine style={{ color: "black", fontSize: "120%", flex: "1" }} />
      <input className="search" type="search" placeholder="Search" />
      <BiDotsVerticalRounded
        style={{ color: "#1966FF", fontSize: "120%", flex: "1" }}
      />
    </div>
  );
}
