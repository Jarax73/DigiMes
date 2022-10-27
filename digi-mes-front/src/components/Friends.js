import React from "react";
import PropTypes from "prop-types";
import UserConversation from "./UserConversation";
import ConnectedUsers from "./ConnectedUsers";
import { useContext } from "react";
import { AppContext } from "../App";

export default function Friends({ setShown }) {
  Friends.propTypes = {
    setShown: PropTypes.bool,
  };
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
