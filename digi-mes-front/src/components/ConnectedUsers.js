import PropTypes from "prop-types";
import React, { useContext } from "react";
import { AppContext } from "../App";

export default function UserConversation({ setShown }) {
  UserConversation.propTypes = {
    setShown: PropTypes.func,
  };
  const { Jakaps, setOneUser, setId, connected } = useContext(AppContext);

  return (
    <div className="users-discuss">
      {connected.length === 0 ? (
        <div style={{ margin: "5% 5%" }}>loading...</div>
      ) : (
        connected.map((friend) => {
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
        })
      )}
    </div>
  );
}
