// import axios from "axios";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { AppContext } from "../App";

export default function UserConversation({ setShown }) {
  UserConversation.propTypes = {
    setShown: PropTypes.func,
  };
  const {
    Jakaps,
    // token,
    // apiUrl,
    id,
    friends,
    // setFriend,
    // oneUser,
    setOneUser,
    setId,
    createRoom,
  } = useContext(AppContext);

  // console.log(token)
  console.log(id);
  console.log(friends);
  // useEffect(() => {
  //   if (!token) return;
  //   axios
  //     .get(`${apiUrl}api/users`, {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => setFriend(response.data));
  // }, [token]);

  return (
    <div className="users-discuss">
      {friends.length === 0 ? (
        <div style={{ margin: "5% 5%" }}>loading...</div>
      ) : (
        friends.map((friend) => {
          return (
            <div
              style={{ textDecoration: "none" }}
              key={friend.id}
              onClick={() => {
                setShown(true);
                setId(friend.id);
                setOneUser(friend);
                createRoom(friend.id);
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
