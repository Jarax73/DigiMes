import React, { useContext, useEffect } from "react";
import { BsChatDotsFill } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

export default function Menu() {
  const { Jakaps, user, logout, socket, setFriend } = useContext(AppContext);

  useEffect(() => {
    console.log(socket.current);
    if (!user) return;
    socket.current.emit("logged_in", user);
  }, [user]);

  useEffect(() => {
    socket.current.on("update_list", (data) => setFriend(data));
  }, []);

  return (
    <nav className="menu">
      <div className="image-user">
        <img className="user-avatar" src={Jakaps} alt="user" />
        <div style={{ textAlign: "center" }}>
          {!user ? (
            <p>loading...</p>
          ) : (
            <p>
              {user.firstName} {user.lastName}{" "}
            </p>
          )}
        </div>
      </div>
      <div className="path-user">
        <Link to="/" className="message">
          <BsChatDotsFill
            style={{ fontSize: "50px", paddingLeft: "25%", color: "#fff" }}
          />
        </Link>
      </div>
      <div className="logout" onClick={logout}>
        <TbLogout style={{ fontSize: "50px", color: "#eaeaea" }} />
      </div>
    </nav>
  );
}
