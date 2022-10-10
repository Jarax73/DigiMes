import React, { useContext } from "react";
import { AppContext } from "../App";

export default function UserConversation() {
  const { Jakaps } = useContext(AppContext);
  return (
    <div className="users-discuss">
      <h1 style={{ paddingLeft: "20px" }}>Recent</h1>
      <div className="conversation">
        <div className="conversation-img">
          <img className="user-avatar" src={Jakaps} alt="user" />
        </div>
        <div className="info-conversation">
          <h3>Raghav</h3>
          <p>Message</p>
        </div>
      </div>
      <hr style={{ width: "90%" }}></hr>
      <div className="conversation">
        <div className="conversation-img">
          <img className="user-avatar" src={Jakaps} alt="user" />
        </div>
        <div className="info-conversation">
          <h3>Raghav</h3>
          <p>Message</p>
        </div>
      </div>
      <hr style={{ width: "90%" }}></hr>
      <div className="conversation">
        <div className="conversation-img">
          <img className="user-avatar" src={Jakaps} alt="user" />
        </div>
        <div className="info-conversation">
          <h3>Raghav</h3>
          <p>Message</p>
        </div>
      </div>
      <hr style={{ width: "90%" }}></hr>
    </div>
  );
}
