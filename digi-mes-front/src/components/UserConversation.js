import axios from "axios";
import PropTypes from "prop-types";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

export default function UserConversation({ setShown }) {
  UserConversation.propTypes = {
    setShown: PropTypes.func,
  };
  const { Jakaps, token, friends, setFriend, setOneUser, setId } =
    useContext(AppContext);

  useEffect(() => {
    if (!token) return;
    axios
      .get("http://localhost:5000/api/users", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setFriend(response.data));
  }, [token]);

  console.log(friends);

  return (
    <div className="users-discuss">
      {friends.length === 0 ? (
        <div style={{ margin: "5% 5%" }}>loading...</div>
      ) : (
        friends.map((friend) => {
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
                    {friend.firstName} {friend.lastName}
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
