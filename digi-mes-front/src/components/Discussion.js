/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useContext } from "react";
// import axios from "axios";
import Discuss from "./Discuss";
import WriteMessage from "./WriteMessage";
import { css } from "@emotion/css";
import ScrollToBottom from "react-scroll-to-bottom";
import { AppContext } from "../context/AppContext";

export default function Discussion({ sendMessage, messages }) {
  const { ProfilePicture, oneUser } = useContext(AppContext);

  const ROOT_CSS = css({
    height: 600,
    width: 400,
  });

  return (
    <section className="discuss">
      <header className="discuss-head">
        <div className="conversation-img">
          <img
            className="user-avatar"
            src={oneUser.imageUrl === "" ? ProfilePicture : oneUser.imageUrl}
            alt="user"
          />
        </div>
        <div className="info-conversation">
          <h3>{oneUser.firstName}</h3>
          {oneUser.socket === undefined ? <p>Disconnect</p> : <p>Online</p>}
        </div>
      </header>
      <hr style={{ width: "90%" }} />
      <ScrollToBottom className="to-discuss" {...ROOT_CSS}>
        {messages &&
          messages.map((message, index) =>
            message === false ? null : <Discuss key={index} message={message} />
          )}
      </ScrollToBottom>
      <div className="send-message">
        <hr style={{ width: "90%", marginBottom: "20px" }} />
        <WriteMessage sendMessage={sendMessage} />
      </div>
    </section>
  );
}
