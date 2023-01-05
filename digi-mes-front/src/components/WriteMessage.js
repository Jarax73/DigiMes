/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { AppContext } from "../context/AppContext";

export default function WriteMessage({ sendMessage }) {
  const { setMessage, message } = useContext(AppContext);

  return (
    <form className="writing-container" onSubmit={sendMessage}>
      <input
        className="writing"
        type="text"
        value={message}
        placeholder="Write your Message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        required
      />
      <button className="send-button">
        <AiOutlineSend style={{ fontSize: "150%", color: "#EAEAEA" }} />
      </button>
    </form>
  );
}
