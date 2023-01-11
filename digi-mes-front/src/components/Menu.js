/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { BsChatDotsFill } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { RiContactsFill } from "react-icons/ri";
import { AppContext } from "../context/AppContext";

export default function Menu() {
  const { ProfilePicture, user, socket, setUserInfo, logout, setShowFriends } =
    useContext(AppContext);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    !user ? null : socket.current.emit("logged_in", user);
  }, [user]);

  return (
    <nav className="menu">
      <div className="image-user">
        <img
          className="user-avatar"
          src={user.imageUrl === "" ? ProfilePicture : user.imageUrl}
          alt="user"
          onClick={() => setUserInfo(true)}
        />
        <div style={{ textAlign: "center" }}>
          {!user ? (
            <p>loading...</p>
          ) : (
            <p>{/* {user.firstName} {user.lastName} */}</p>
          )}
        </div>
      </div>
      <div className="path-user">
        <div
          className="message"
          onClick={() => {
            setIsActive(false);
            setShowFriends(false);
          }}
        >
          <BsChatDotsFill
            style={{ fontSize: "200%", paddingLeft: "25%", color: "#fff" }}
          />
          <div
            style={{
              backgroundColor: isActive ? "" : "yellow",
              height: "100%",
              width: "5%",
            }}
          ></div>
        </div>

        <div
          className="message"
          onClick={() => {
            setIsActive(true);
            setShowFriends(true);
          }}
        >
          <RiContactsFill
            style={{ fontSize: "200%", paddingLeft: "25%", color: "#fff" }}
          />
          <div
            style={{
              backgroundColor: isActive ? "yellow" : "",
              height: "100%",
              width: "5%",
            }}
          ></div>
        </div>
      </div>
      <div className="logout" onClick={logout}>
        <TbLogout style={{ fontSize: "50px", color: "#eaeaea" }} />
      </div>
    </nav>
  );
}
