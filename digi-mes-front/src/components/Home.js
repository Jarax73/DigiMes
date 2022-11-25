/* eslint-disable react/prop-types */
import React, { useState, useContext } from "react";
import Discussion from "./Discussion";
import SearchUser from "./SearchUser";
import WelcomeMessage from "./WelcomeMessage";
import Friends from "./Friends";
import ProfilPicture from "./ProfilePicture";
import { AppContext } from "../context/AppContext";

export default function Home() {
  const [shown, setShown] = useState(false);
  const { userInfo } = useContext(AppContext);

  return (
    <>
      <section className="users">
        <SearchUser />
        <Friends setShown={setShown} />
      </section>
      <section className="discuss">
        {shown === false ? (
          userInfo === false ? (
            <WelcomeMessage />
          ) : (
            <ProfilPicture />
          )
        ) : userInfo === false ? (
          <Discussion />
        ) : (
          <ProfilPicture />
        )}
      </section>
    </>
  );
}
