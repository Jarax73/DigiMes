import React, { useState } from "react";
import Discussion from "./Discussion";
import SearchUser from "./SearchUser";
import UserConversation from "./UserConversation";
import WelcomeMessage from "./WelcomeMessage";
// import User from "./User";

export default function Home() {
  const [shown, setShown] = useState(false);
  return (
    <>
      {/* <User /> */}
      <section className="users">
        <SearchUser />
        <UserConversation setShown={setShown} />
      </section>
      <section className="discuss">
        {shown === false ? <WelcomeMessage /> : <Discussion />}
      </section>
    </>
  );
}
