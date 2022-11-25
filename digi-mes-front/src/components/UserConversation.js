/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { usersUrl } from "../address/UrlAddress";
import { AppContext } from "../context/AppContext";

export default function UserConversation({ setShown }) {
  const {
    ProfilePicture,
    token,
    friends,
    setFriend,
    connected,
    setOneUser,
    setId,
    setUserInfo,
  } = useContext(AppContext);
  console.log(friends);
  console.log(connected);
  useEffect(() => {
    if (!token) return;
    axios
      .get(usersUrl, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setFriend(response.data));
  }, []);

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
                setUserInfo(false);
              }}
            >
              <div className="conversation">
                <div className="conversation-img">
                  <img
                    className="user-avatar"
                    src={
                      friend.imageUrl === "" ? ProfilePicture : friend.imageUrl
                    }
                    alt="user"
                  />
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
