import React from "react";
import SearchUser from "./SearchUser";
import UserConversation from "./UserConversation";

export default function User() {
  return (
    <section className="users">
      <SearchUser />
      <UserConversation />
    </section>
  );
}
