/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function UserConversation({ setShown /*messages*/ }) {
  const { ProfilePicture, setOneUser, setId, user, connected, setUserInfo } =
    useContext(AppContext);

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
                  setUserInfo(false);
                }}
              >
                <div className="conversation">
                  <div className="conversation-img">
                    <img
                      className="user-avatar"
                      src={
                        friend.imageUrl === ""
                          ? ProfilePicture
                          : friend.imageUrl
                      }
                      alt="user"
                    />
                  </div>
                  <div className="info-conversation">
                    <h3>
                      {friend.firstName} {friend.lastName}{" "}
                    </h3>
                    <p>
                      {/* {friend.messages[friend.messages.length - 1]?.discussion} */}
                    </p>
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
