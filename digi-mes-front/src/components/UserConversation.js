/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { usersUrl } from "../address/UrlAddress";
import { AppContext } from "../context/AppContext";

export default function UserConversation({ setShown }) {
  const {
    logout,
    ProfilePicture,
    token,
    friends,
    connected,
    setFriend,
    setOneUser,
    setId,
    user,
    setUserInfo,
  } = useContext(AppContext);

  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    for (let i = friends.length; i > 0; i--) {
      if (friends[i] === connected[i]) setEmployees(connected[i]);
      setEmployees(connected[i]);
    }
  }, []);

  console.log(employees);

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
      .then((response) => {
        setFriend(response.data);
      })
      .catch((error) => {
        if (error.response.data === "Unauthorized") logout();
      });
  }, []);

  return (
    <div className="users-discuss">
      {friends.length === 0 ? (
        <div style={{ margin: "5% 5%" }}>loading...</div>
      ) : (
        friends.map((friend) => {
          connected.map((active) => {
            if (friend._id !== user._id && friend._id) {
              return (
                <div
                  style={{ textDecoration: "none" }}
                  key={friend._id}
                  onClick={() => {
                    setShown(true);
                    setId(friend._id);
                    friend._id === active._id
                      ? setOneUser(active)
                      : setOneUser(friend);
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
                      {friend._id === active._id ? (
                        <h3>
                          {active.firstName} {active.lastName}
                        </h3>
                      ) : (
                        <h3>
                          {friend.firstName} {friend.lastName}
                        </h3>
                      )}
                      <p>Message</p>
                    </div>
                  </div>
                </div>
              );
            }
          });
        })
      )}
    </div>
  );
}
