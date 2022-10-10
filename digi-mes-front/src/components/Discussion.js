import React, { useContext } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { AppContext } from "../App";

export default function Discussion() {
  const { Jakaps } = useContext(AppContext);
  return (
    <section className="discuss">
      <header className="discuss-head">
        <div className="conversation-img">
          <img className="user-avatar" src={Jakaps} alt="user" />
        </div>
        <div className="info-conversation">
          <h3>Raghav</h3>
          <p>Online</p>
        </div>
      </header>
      <hr style={{ width: "90%" }} />
      <div className="to-discuss">
        <p>Salut</p>
        <p>Salut</p>
        <p>Salut</p>
        <p>Salut</p>
        <p>Salut</p>
        <p>Salut</p>
        <p>Salut</p>
        <p>Salut</p>
        <p>Salut</p>
        <p>Salut</p>
        <p>Salut</p>
        <p>Salut</p>
        <p>Salut</p>
      </div>
      <div className="send-message">
        <hr style={{ width: "90%", marginBottom: "20px" }} />
        <div className="writing-container">
          <input
            className="writing"
            type="text"
            placeholder="Write your Message"
          />
          <div className="send-button">
            <AiOutlineSend style={{ fontSize: "150%", color: "#EAEAEA" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
