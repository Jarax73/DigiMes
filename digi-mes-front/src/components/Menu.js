import React, { useContext, useEffect } from "react";
import { BsChatDotsFill } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { RiContactsFill } from "react-icons/ri";
import { AppContext } from "../context/AppContext";

export default function Menu() {
  const { Jakaps, user, socket, logout, setShowFriends } =
    useContext(AppContext);

  useEffect(() => {
    !user ? null : socket.current.emit("logged_in", user);
  }, [user]);
  return (
    <nav className="menu">
      <div className="image-user">
        <img className="user-avatar" src={Jakaps} alt="user" />
        <div style={{ textAlign: "center" }}>
          {!user ? (
            <p>loading...</p>
          ) : (
            <p>
              {user.firstName} {user.lastName}
            </p>
          )}
        </div>
      </div>
      <div className="path-user">
        <div className="message" onClick={() => setShowFriends(false)}>
          <BsChatDotsFill
            style={{ fontSize: "200%", paddingLeft: "25%", color: "#fff" }}
          />
        </div>

        <div className="message" onClick={() => setShowFriends(true)}>
          <RiContactsFill
            style={{ fontSize: "200%", paddingLeft: "25%", color: "#fff" }}
          />
        </div>
      </div>
      <div className="logout" onClick={logout}>
        <TbLogout style={{ fontSize: "50px", color: "#eaeaea" }} />
      </div>
    </nav>
  );
}
