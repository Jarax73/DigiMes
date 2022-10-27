import React, { useState } from "react";
import Discussion from "./Discussion";
import SearchUser from "./SearchUser";
import WelcomeMessage from "./WelcomeMessage";
import Friends from "./Friends";
// import User from "./User";

export default function Home() {
  const [shown, setShown] = useState(false);
  return (
    <>
      {/* <User /> */}
      <section className="users">
        <SearchUser />
        <Friends setShown={setShown} />
      </section>
      <section className="discuss">
        {shown === false ? <WelcomeMessage /> : <Discussion />}
      </section>
    </>
  );
}
