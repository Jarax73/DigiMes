import React, { useContext } from "react";
// import PropTypes from "prop-types";
import { AiOutlineSend } from "react-icons/ai";
import { AppContext } from "../App";

export default function WriteMessage() {
  const { sendMessage, setMessage, message } = useContext(AppContext);

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
      />
      <button className="send-button">
        <AiOutlineSend style={{ fontSize: "150%", color: "#EAEAEA" }} />
      </button>
    </form>
  );
}
