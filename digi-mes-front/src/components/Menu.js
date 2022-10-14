import React, { useContext } from "react";
import { BsChatDotsFill } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { AppContext } from "../App";

export default function Menu() {
  const { Jakaps, user } = useContext(AppContext);
  console.log(user);
  return (
    <nav className="menu">
      <div className="image-user">
        <img className="user-avatar" src={Jakaps} alt="user" />
        <p style={{textAlign:'center'}} >{user.firstName}{' '}{user.lastName} </p>
      </div>
      <div className="path-user">
        <div className="message">
          <BsChatDotsFill
            style={{ fontSize: "50px", paddingLeft: "25%", color: "#fff" }}
          />
        </div>
      </div>
      <div className="logout">
        <TbLogout style={{ fontSize: "50px", color: "#eaeaea" }} />
      </div>
    </nav>
  );
}
