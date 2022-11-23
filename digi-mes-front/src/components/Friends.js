/* eslint-disable react/prop-types */
import React from "react";
import UserConversation from "./UserConversation";
import ConnectedUsers from "./ConnectedUsers";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Friends({ setShown }) {
  const { showFriends } = useContext(AppContext);
  return (
    <>
      {showFriends === false ? (
        <ConnectedUsers setShown={setShown} />
      ) : (
        <UserConversation setShown={setShown} />
      )}
    </>
  );
}
