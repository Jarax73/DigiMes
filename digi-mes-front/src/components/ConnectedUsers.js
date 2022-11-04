import PropTypes from "prop-types";
import React, { useContext } from "react";
import { AppContext } from "../App";

export default function UserConversation({ setShown }) {
  UserConversation.propTypes = {
    setShown: PropTypes.func,
  };
  const { Jakaps, setOneUser, setId, user, connected } = useContext(AppContext);
  console.log(connected);
  return (
    <div className="users-discuss">
      <h2 style={{ margin: "3%" }}>Connected</h2>
      <hr />
      {connected.length === 0 ? (
        <div style={{ margin: "5% 5%" }}>*** No users connected</div>
      ) : (
        connected.map((friend) => {
          if (friend._id !== user._id) {
            return (
              <div
                style={{ textDecoration: "none" }}
                key={friend._id}
                onClick={() => {
                  setShown(true);
                  setId(friend._id);
                  setOneUser(friend);
                }}
              >
                <div className="conversation">
                  <div className="conversation-img">
                    <img className="user-avatar" src={Jakaps} alt="user" />
                  </div>
                  <div className="info-conversation">
                    <h3>
                      {friend.firstName} {friend.lastName}{" "}
                    </h3>
                    <p>Message</p>
                  </div>
                </div>
              </div>
            );
          }
        })
      )}
    </div>
  );
}
