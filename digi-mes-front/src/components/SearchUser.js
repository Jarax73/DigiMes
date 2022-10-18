import React, { useContext, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { BiDotsVerticalRounded } from "react-icons/bi";
import axios from "axios";
import { AppContext } from "../App";
// import { Link } from "react-router-dom";

export default function SearchUser() {
  const { token, userToChat, setUserToChat } = useContext(AppContext);
  const [keySearch, setKeySearch] = useState("");

  const searchuser = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:5000/api/users", {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          firstName: keySearch,
        },
      })
      .then((response) => setUserToChat(response.data));
    e.target.reset();
  };
  console.log(userToChat);
  console.log(keySearch);
  return (
    // <>
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* <div
        style={{
          display: "flex",
          textDecoration: "none",
          justifyContent: "space-between",
          width: "100%",
        }}
      > */}
      <form className="search-user" onSubmit={searchuser}>
        <RiSearchLine style={{ color: "black", fontSize: "120%", flex: "1" }} />
        <input
          className="search"
          type="search"
          placeholder="Search"
          onChange={(e) => setKeySearch(e.target.value)}
        />
        <BiDotsVerticalRounded
          style={{ color: "#1966FF", fontSize: "120%", flex: "1" }}
        />
      </form>
      {/* </div> */}
    </div>
    // </>
  );
}
